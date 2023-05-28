import type { Application, RequestHandler } from "express";
import { globbySync } from "globby";
import type { GraphQLScalarType } from "graphql";
import { createSchema, createYoga, type YogaServerInstance } from "graphql-yoga";
import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { container, type DependencyContainer, injectable } from "tsyringe";
import {
    abstractTypes,
    objectTypes,
    type ResolverSchemaAbstract,
    type ResolverSchemaObject,
    rootTypes,
    scalarTypes,
} from "../schemas/resolverSchema.js";
import type { WebServerContext, WebServerMiddleware } from "../webServer.js";

@injectable()
export default class GraphqlMiddleware implements WebServerMiddleware {
    private yogaServer: YogaServerInstance<WebServerContext, GraphqlMiddlewareContext>;

    public constructor() {
        this.yogaServer = createYoga({
            graphqlEndpoint: "/",
            schema: createSchema({
                typeDefs: this.loadDefinitions(),
                resolvers: this.mergeResolvers(),
            }),
            context: { container: container.createChildContainer() },
        });
    }

    public apply(application: Application): void {
        application.use("/", this.yogaServer as RequestHandler);
    }

    private loadDefinitions(): string[] {
        const files = globbySync("../schemas/**/*.graphql", {
            cwd: dirname(fileURLToPath(import.meta.url)),
            absolute: true,
        });

        return files.map((file) => readFileSync(file, "utf-8"));
    }

    private mergeResolvers(): Record<string, GraphqlMiddlewareResolver>[] {
        return [...scalarTypes, ...rootTypes, ...abstractTypes, ...objectTypes];
    }
}

type GraphqlMiddlewareResolver = GraphQLScalarType | ResolverSchemaAbstract<never> | ResolverSchemaObject<never>;

export interface GraphqlMiddlewareContext {
    container: DependencyContainer;
}

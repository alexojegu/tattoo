import type { Application } from "express";
import { globbySync } from "globby";
import { createSchema, createYoga, YogaServerInstance } from "graphql-yoga";
import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { container, DependencyContainer, injectable } from "tsyringe";
import { ResolverSchemaType, rootTypes } from "../schemas/resolverSchema.js";
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
            context: () => ({ container: container.createChildContainer() }),
        });
    }

    public apply(application: Application): void {
        application.use("/", this.yogaServer);
    }

    private loadDefinitions(): string[] {
        const files = globbySync("../schemas/**/*.graphql", {
            cwd: dirname(fileURLToPath(import.meta.url)),
            absolute: true,
        });

        return files.map((file) => readFileSync(file, "utf-8"));
    }

    private mergeResolvers(): Record<string, ResolverSchemaType<never>>[] {
        return [...rootTypes];
    }
}

export interface GraphqlMiddlewareContext {
    container: DependencyContainer;
}

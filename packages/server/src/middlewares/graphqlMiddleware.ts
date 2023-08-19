import { loadFilesSync } from "@graphql-tools/load-files";
import type { Application, RequestHandler } from "express";
import { createSchema, createYoga, type YogaServerInstance } from "graphql-yoga";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { container, type DependencyContainer, injectable } from "tsyringe";
import { resolverAbstracts, resolverRoots, resolverScalars, resolverTypes } from "../schemas/resolverSchema.js";
import type { WebServerContext, WebServerMiddleware } from "../webServer.js";

@injectable()
export default class GraphqlMiddleware implements WebServerMiddleware {
    private yogaServer: YogaServerInstance<WebServerContext, GraphqlMiddlewareContext>;

    public constructor() {
        this.yogaServer = createYoga({
            graphqlEndpoint: "/",
            schema: createSchema({
                typeDefs: loadFilesSync(join(dirname(fileURLToPath(import.meta.url)), "../schemas/**/*.graphql")),
                resolvers: [...resolverScalars, ...resolverRoots, ...resolverAbstracts, ...resolverTypes],
            }),
            context: { container: container.createChildContainer() },
        });
    }

    public apply(application: Application): void {
        application.use(this.yogaServer.graphqlEndpoint, this.yogaServer as RequestHandler);
    }
}

export interface GraphqlMiddlewareContext {
    container: DependencyContainer;
}

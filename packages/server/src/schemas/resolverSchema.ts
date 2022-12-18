import type { GraphQLFieldResolver } from "graphql";
import type { YogaInitialContext } from "graphql-yoga";
import type { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware.js";
import type { WebServerContext } from "../webServer.js";
import { rootAccount } from "./accounts/resolverAccount.js";

export const rootTypes: Partial<Record<"Query" | "Mutation", ResolverSchemaType<undefined>>>[] = [rootAccount];

export interface ResolverSchemaType<TSource> {
    [key: string]: GraphQLFieldResolver<TSource, YogaInitialContext & WebServerContext & GraphqlMiddlewareContext>;
}

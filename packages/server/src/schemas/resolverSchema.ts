import type { GraphQLFieldResolver, GraphQLScalarType } from "graphql";
import type { YogaInitialContext } from "graphql-yoga";
import type { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware.js";
import type { WebServerContext } from "../webServer.js";
import { accountRoot } from "./accounts/resolverAccount.js";
import dateScalar from "./scalars/dateScalar.js";

export const scalarTypes: Record<string, GraphQLScalarType>[] = [dateScalar];

export const rootTypes: Record<string, ResolverSchemaType<undefined>>[] = [accountRoot];

export interface ResolverSchemaType<TSource> {
    [key: string]: GraphQLFieldResolver<TSource, YogaInitialContext & WebServerContext & GraphqlMiddlewareContext>;
}

import type { GraphQLFieldResolver, GraphQLScalarType, GraphQLTypeResolver } from "graphql";
import type { YogaInitialContext } from "graphql-yoga";
import type { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware.js";
import type { WebServerContext } from "../webServer.js";
import { accountObject, accountRoot } from "./accounts/resolverAccount.js";
import { nodeAbstract, nodeRoot } from "./nodes/resolverNode.js";
import dateScalar from "./scalars/dateScalar.js";
import { tattooObject, tattootRoot } from "./tattoos/resolverTattoo.js";

export const scalarTypes: Record<string, GraphQLScalarType>[] = [dateScalar];

export const rootTypes: Record<string, ResolverSchemaObject<undefined>>[] = [nodeRoot, accountRoot, tattootRoot];

export const abstractTypes: Record<string, ResolverSchemaAbstract<never>>[] = [nodeAbstract];

export const objectTypes: Record<string, ResolverSchemaObject<never>>[] = [accountObject, tattooObject];

type ResolverSchemaContext = YogaInitialContext & WebServerContext & GraphqlMiddlewareContext;

export interface ResolverSchemaObject<TSource> {
    [key: string]: GraphQLFieldResolver<TSource, ResolverSchemaContext>;
}

export interface ResolverSchemaAbstract<TSource> {
    [key: string]: GraphQLTypeResolver<TSource, ResolverSchemaContext>;
}

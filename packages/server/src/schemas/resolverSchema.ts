import type { GraphQLFieldResolver, GraphQLScalarType, GraphQLTypeResolver } from "graphql";
import type { YogaInitialContext } from "graphql-yoga";
import type { GraphqlMiddlewareContext } from "../middlewares/graphqlMiddleware.js";
import type { WebServerContext } from "../webServer.js";
import { accountRoot, accountType } from "./accounts/resolverAccount.js";
import { artistRoot, artistType } from "./artists/resolverArtist.js";
import { nodeAbstract, nodeRoot } from "./nodes/resolverNode.js";
import dateScalar from "./scalars/dateScalar.js";
import { tattooRoot, tattooType } from "./tattoos/resolverTattoo.js";

export const resolverScalars: Record<string, GraphQLScalarType>[] = [dateScalar];

export const resolverRoots: Record<string, ResolverSchemaObject<undefined>>[] = [
    nodeRoot,
    accountRoot,
    artistRoot,
    tattooRoot,
];

export const resolverAbstracts: Record<string, ResolverSchemaAbstract<never>>[] = [nodeAbstract];

export const resolverTypes: Record<string, ResolverSchemaObject<never>>[] = [accountType, artistType, tattooType];

type ResolverSchemaContext = YogaInitialContext & WebServerContext & GraphqlMiddlewareContext;

export type ResolverSchemaObject<TSource> = Record<string, GraphQLFieldResolver<TSource, ResolverSchemaContext>>;

export type ResolverSchemaAbstract<TSource> = Record<string, GraphQLTypeResolver<TSource, ResolverSchemaContext>>;

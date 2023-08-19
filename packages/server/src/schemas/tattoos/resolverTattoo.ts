import type TattooEntity from "../../entities/tattooEntity.js";
import ArtistService from "../../services/artistService.js";
import TattooService from "../../services/tattooService.js";
import type { ResolverSchemaObject } from "../resolverSchema.js";

export const tattooRoot: Record<"Query", ResolverSchemaObject<undefined>> = {
    Query: {
        tattoo: async (_source, { id }, context) => {
            return context.container.resolve(TattooService).getTattoo(id);
        },
        tattoos: async (_source, args, context) => {
            return context.container.resolve(TattooService).getTattoos(args);
        },
    },
};

export const tattooType: Record<"Tattoo", ResolverSchemaObject<TattooEntity>> = {
    Tattoo: {
        id: (source) => {
            return TattooService.globalId(source);
        },
        artist: async ({ artist }, _args, context) => {
            return context.container.resolve(ArtistService).loadNode(artist.id);
        },
    },
};

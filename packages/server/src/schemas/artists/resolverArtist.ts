import type ArtistEntity from "../../entities/artistEntity.js";
import ArtistService from "../../services/artistService.js";
import type { ResolverSchemaObject } from "../resolverSchema.js";

export const artistRoot: Record<"Query", ResolverSchemaObject<undefined>> = {
    Query: {
        artist: async (_source, { id }, context) => {
            return context.container.resolve(ArtistService).getArtist(id);
        },
        artists: async (_source, args, context) => {
            return context.container.resolve(ArtistService).getArtists(args);
        },
    },
};

export const artistObject: Record<"Artist", ResolverSchemaObject<ArtistEntity>> = {
    Artist: {
        id: (source) => {
            return ArtistService.globalId(source);
        },
    },
};

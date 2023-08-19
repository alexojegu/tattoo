import type ArtistEntity from "../../entities/artistEntity.js";
import AccountService from "../../services/accountService.js";
import ArtistService from "../../services/artistService.js";
import TattooService from "../../services/tattooService.js";
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

export const artistType: Record<"Artist", ResolverSchemaObject<ArtistEntity>> = {
    Artist: {
        id: (source) => {
            return ArtistService.globalId(source);
        },
        account: async ({ account }, _args, context) => {
            return context.container.resolve(AccountService).loadNode(account.id);
        },
        tattoos: async ({ id }, args, context) => {
            return context.container.resolve(TattooService).loadArtist(id, args);
        },
    },
};

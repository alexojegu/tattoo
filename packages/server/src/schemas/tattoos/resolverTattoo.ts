import type TattooEntity from "../../entities/tattooEntity.js";
import TattooService from "../../services/tattooService.js";
import type { ResolverSchemaObject } from "../resolverSchema.js";

export const tattootRoot: Record<"Query", ResolverSchemaObject<undefined>> = {
    Query: {
        tattoo: async (_source, { id }, context) => {
            return context.container.resolve(TattooService).getTattoo(id);
        },
    },
};

export const tattooObject: Record<"Tattoo", ResolverSchemaObject<TattooEntity>> = {
    Tattoo: {
        id: (source) => {
            return TattooService.globalId(source);
        },
    },
};

import type { ResolverSchemaType } from "../resolverSchema.js";

export const rootAccount: Record<"Query", ResolverSchemaType<undefined>> = {
    Query: {
        account: (_source, { id }) => {
            return { id, name: "Tattoo" };
        },
    },
};

import AccountService from "../../services/accountService.js";
import type { ResolverSchemaType } from "../resolverSchema.js";

export const rootAccount: Record<"Query", ResolverSchemaType<undefined>> = {
    Query: {
        account: async (_source, { id }, context) => {
            return context.container.resolve(AccountService).getNode(id);
        },
    },
};

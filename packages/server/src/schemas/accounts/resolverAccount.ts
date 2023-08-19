import type AccountEntity from "../../entities/accountEntity.js";
import AccountService from "../../services/accountService.js";
import type { ResolverSchemaObject } from "../resolverSchema.js";

export const accountRoot: Record<"Query", ResolverSchemaObject<undefined>> = {
    Query: {
        account: async (_source, { id }, context) => {
            return context.container.resolve(AccountService).getAccount(id);
        },
    },
};

export const accountType: Record<"Account", ResolverSchemaObject<AccountEntity>> = {
    Account: {
        id: (source) => {
            return AccountService.globalId(source);
        },
    },
};

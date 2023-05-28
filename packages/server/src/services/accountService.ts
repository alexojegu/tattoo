import { GraphQLError } from "graphql";
import { inject, injectable } from "tsyringe";
import type AccountEntity from "../entities/accountEntity.js";
import AccountLoader from "../loaders/accountLoader.js";
import type { NodeProxyService } from "../proxies/nodeProxy.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import GraphqlUtil from "../utils/graphqlUtil.js";

@injectable()
export default class AccountService implements NodeProxyService {
    private accountLoader: AccountLoader;

    public constructor(@inject(AccountLoader) accountLoader: AccountLoader) {
        this.accountLoader = accountLoader;
    }

    public static globalId(entity: AccountEntity): string {
        return GraphqlUtil.encodeGid(ResolverNode.Account, entity.id);
    }

    public async getAccount(gid: string): Promise<AccountEntity | undefined> {
        const [type, id] = GraphqlUtil.decodeGid(gid);

        if (type !== ResolverNode.Account || typeof id !== "number") {
            throw new GraphQLError("Account global ID cannot be in an invalid format");
        }

        return this.loadNode(id);
    }

    public async loadNode(id: number): Promise<AccountEntity | undefined> {
        return this.accountLoader.fillNode(id);
    }
}

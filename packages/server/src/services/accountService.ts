import { inject, injectable } from "tsyringe";
import type AccountEntity from "../entities/accountEntity.js";
import type { NodeProxyService } from "../proxies/nodeProxy.js";
import { ResolverNode } from "../schemas/nodes/resolverNode.js";
import AccountStore from "../stores/accountStore.js";
import GraphqlUtil from "../utils/graphqlUtil.js";

@injectable()
export default class AccountService implements NodeProxyService {
    private accountStore: AccountStore;

    public constructor(@inject(AccountStore) accountStore: AccountStore) {
        this.accountStore = accountStore;
    }

    public static globalId(entity: AccountEntity): string {
        return GraphqlUtil.encode({ type: ResolverNode.Account, id: entity.id });
    }

    public async getAccount(gid: string): Promise<AccountEntity | null> {
        const { type, id } = GraphqlUtil.decode(gid);

        if (type !== ResolverNode.Account || typeof id != "number") {
            return null;
        }

        return this.getNode(id);
    }

    public async getNode(id: number): Promise<AccountEntity | null> {
        if (id <= 0) {
            return null;
        }

        return this.accountStore.findId(id);
    }
}

import { inject, Lifecycle, scoped } from "tsyringe";
import type AccountEntity from "../entities/accountEntity.js";
import AccountStore from "../stores/accountStore.js";

@scoped(Lifecycle.ContainerScoped)
export default class AccountService {
    private accountStore: AccountStore;

    public constructor(@inject(AccountStore) accountStore: AccountStore) {
        this.accountStore = accountStore;
    }

    public async getNode(id: string): Promise<AccountEntity | null> {
        return this.accountStore.findId(Number(id));
    }
}

import { inject, Lifecycle, scoped } from "tsyringe";
import type AccountEntity from "../entities/accountEntity.js";
import AccountStore from "../stores/accountStore.js";
import NodeLoader from "./nodeLoader.js";

@scoped(Lifecycle.ContainerScoped)
export default class AccountLoader extends NodeLoader<AccountEntity> {
    public constructor(@inject(AccountStore) accountStore: AccountStore) {
        super(accountStore);
    }
}

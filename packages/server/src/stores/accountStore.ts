import { inject, singleton } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import AccountEntity from "../entities/accountEntity.js";
import AbstractStore from "./abstractStore.js";

@singleton()
export default class AccountStore extends AbstractStore<AccountEntity> {
    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        super(databaseClient.manager.getRepository(AccountEntity));
    }
}

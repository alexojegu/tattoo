import { inject, singleton } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import AccountEntity from "../entities/accountEntity.js";
import NodeStore from "./nodeStore.js";

@singleton()
export default class AccountStore extends NodeStore<AccountEntity> {
    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        super(databaseClient.manager.getRepository(AccountEntity));
    }
}

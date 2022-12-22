import type { EntityRepository } from "@mikro-orm/postgresql";
import { inject, singleton } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import AccountEntity from "../entities/accountEntity.js";

@singleton()
export default class AccountStore {
    private entityRepository: EntityRepository<AccountEntity>;

    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        this.entityRepository = databaseClient.manager.getRepository(AccountEntity);
    }

    public async findId(id: number): Promise<AccountEntity | null> {
        return this.entityRepository.findOne({ id: { $eq: id } });
    }
}

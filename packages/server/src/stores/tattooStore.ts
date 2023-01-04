import type { EntityRepository } from "@mikro-orm/postgresql";
import { inject, singleton } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import TattooEntity from "../entities/tattooEntity.js";

@singleton()
export default class TattooStore {
    private entityRepository: EntityRepository<TattooEntity>;

    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        this.entityRepository = databaseClient.manager.getRepository(TattooEntity);
    }

    public async findId(id: number): Promise<TattooEntity | null> {
        return this.entityRepository.findOne({ id: { $eq: id } });
    }
}

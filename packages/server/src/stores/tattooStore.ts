import { inject, singleton } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import TattooEntity from "../entities/tattooEntity.js";
import type { GraphqlUtilPage } from "../utils/graphqlUtil.js";
import AbstractStore from "./abstractStore.js";

@singleton()
export default class TattooStore extends AbstractStore<TattooEntity> {
    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        super(databaseClient.manager.getRepository(TattooEntity));
    }

    public async findRows({ limit, step, cursor }: GraphqlUtilPage): Promise<TattooEntity[]> {
        const [operator, order] = step === "after" ? ["$gt", 1] : ["$lt", -1];

        if (!cursor.length) {
            return this.entityRepository.findAll({ orderBy: { id: order }, limit });
        }

        return this.entityRepository.find({ id: { [operator]: cursor[0] } }, { orderBy: { id: order }, limit });
    }
}
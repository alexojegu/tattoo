import { inject, singleton } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import TattooEntity from "../entities/tattooEntity.js";
import type PageUtil from "../utils/pageUtil.js";
import NodeStore from "./nodeStore.js";

@singleton()
export default class TattooStore extends NodeStore<TattooEntity> {
    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        super(databaseClient.manager.getRepository(TattooEntity));
    }

    public async findRows(pageUtil: PageUtil): Promise<TattooEntity[]> {
        return this.entityRepository.find(pageUtil.queryFilter<TattooEntity>(), {
            orderBy: pageUtil.queryOrder<TattooEntity>(),
            limit: pageUtil.queryLimit(),
        });
    }

    public async findArtists(ids: readonly number[], pageUtil: PageUtil): Promise<TattooEntity[]> {
        const knex = this.entityRepository.getKnex("read");
        const results = await knex({ a0: "artist" })
            .select("a0.id", "t0.*")
            .joinRaw(
                `left join lateral (${this.entityRepository
                    .createQueryBuilder("t1")
                    .where({ artist: { $eq: knex.ref("a0.id") } })
                    .andWhere(pageUtil.queryFilter())
                    .orderBy(pageUtil.queryOrder())
                    .limit(pageUtil.queryLimit())
                    .getKnexQuery()}
                ) as t0 on a0.id = t0.artist_id`,
            )
            .whereIn("t0.artist_id", ids);

        return results.map((result) => this.entityRepository.map(result));
    }
}

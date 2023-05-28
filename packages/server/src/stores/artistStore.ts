import { inject, singleton } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import ArtistEntity from "../entities/artistEntity.js";
import type PageUtil from "../utils/pageUtil.js";
import NodeStore from "./nodeStore.js";

@singleton()
export default class ArtistStore extends NodeStore<ArtistEntity> {
    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        super(databaseClient.manager.getRepository(ArtistEntity));
    }

    public async findRows(pageUtil: PageUtil): Promise<ArtistEntity[]> {
        return this.entityRepository.find(pageUtil.queryFilter<ArtistEntity>(), {
            orderBy: pageUtil.queryOrder<ArtistEntity>(),
            limit: pageUtil.queryLimit(),
        });
    }
}

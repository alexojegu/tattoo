import type { FilterQuery } from "@mikro-orm/core";
import type { EntityRepository } from "@mikro-orm/postgresql";
import type NodeEntity from "../entities/nodeEntity.js";

export default abstract class NodeStore<TEntity extends NodeEntity> {
    protected entityRepository: EntityRepository<TEntity>;

    public constructor(entityRepository: EntityRepository<TEntity>) {
        this.entityRepository = entityRepository;
    }

    public async findIds(ids: readonly number[]): Promise<TEntity[]> {
        return this.entityRepository.find({ id: { $in: ids } } as FilterQuery<TEntity>);
    }
}

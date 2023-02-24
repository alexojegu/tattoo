import type { FilterQuery } from "@mikro-orm/core";
import type { EntityRepository } from "@mikro-orm/postgresql";
import type AbstractEntity from "../entities/abstractEntity.js";

export default abstract class AbstractStore<TEntity extends AbstractEntity> {
    protected entityRepository: EntityRepository<TEntity>;

    public constructor(entityRepository: EntityRepository<TEntity>) {
        this.entityRepository = entityRepository;
    }

    public async findId(id: number): Promise<TEntity | null> {
        return this.entityRepository.findOne({ id: { $eq: id } } as FilterQuery<TEntity>);
    }
}

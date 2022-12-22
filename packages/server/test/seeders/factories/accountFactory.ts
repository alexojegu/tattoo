import type { Constructor, EntityData, EntityManager } from "@mikro-orm/core";
import { Factory, Faker } from "@mikro-orm/seeder";
import AccountEntity from "../../../src/entities/accountEntity.js";

export default class AccountFactory extends Factory<AccountEntity> {
    public model: Constructor<AccountEntity>;

    public constructor(entityManager: EntityManager) {
        super(entityManager);

        this.model = AccountEntity;
    }

    public definition(faker: Faker): EntityData<AccountEntity> {
        return {
            name: faker.name.fullName(),
        };
    }
}

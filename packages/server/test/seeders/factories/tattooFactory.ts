import type { Constructor, EntityData, EntityManager } from "@mikro-orm/core";
import { Factory, Faker } from "@mikro-orm/seeder";
import TattooEntity from "../../../src/entities/tattooEntity.js";

export default class TattooFactory extends Factory<TattooEntity> {
    public model: Constructor<TattooEntity>;

    public constructor(entityManager: EntityManager) {
        super(entityManager);

        this.model = TattooEntity;
    }

    public definition(faker: Faker): EntityData<TattooEntity> {
        return {
            image: faker.image.imageUrl(),
            width: 640,
            height: 480,
        };
    }
}

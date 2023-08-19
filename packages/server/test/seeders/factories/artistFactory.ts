import type { Constructor, EntityData, EntityManager } from "@mikro-orm/core";
import { Factory, type Faker } from "@mikro-orm/seeder";
import ArtistEntity from "../../../src/entities/artistEntity.js";

export default class ArtistFactory extends Factory<ArtistEntity> {
    public model: Constructor<ArtistEntity>;

    public constructor(entityManager: EntityManager) {
        super(entityManager);

        this.model = ArtistEntity;
    }

    public definition(faker: Faker): EntityData<ArtistEntity> {
        return {
            avatar: faker.helpers.maybe(() => faker.image.avatar()) ?? null,
            about: faker.lorem.paragraphs(),
        };
    }
}

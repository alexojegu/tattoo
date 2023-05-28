import type { Dictionary } from "@mikro-orm/core";
import type { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import type AccountEntity from "../../src/entities/accountEntity.js";
import ArtistFactory from "./factories/artistFactory.js";

export default class ArtistSeeder extends Seeder {
    public async run(entityManager: EntityManager, context: Dictionary): Promise<void> {
        const artistFactory = new ArtistFactory(entityManager);

        context["artists"] = context["accounts"].map((account: AccountEntity) => {
            return artistFactory.makeOne({ account });
        });

        await entityManager.flush();
    }
}

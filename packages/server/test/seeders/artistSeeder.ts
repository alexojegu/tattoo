import type { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import type { AccountSeederDictionary } from "./accountSeeder.js";
import ArtistFactory from "./factories/artistFactory.js";
import type ArtistEntity from "../../src/entities/artistEntity.js";

export default class ArtistSeeder extends Seeder {
    public async run(entityManager: EntityManager, context: AccountSeederDictionary): Promise<void> {
        const artistFactory = new ArtistFactory(entityManager);

        context["artists"] = context.accounts.map((account) => {
            return artistFactory.makeOne({ account });
        });

        await entityManager.flush();
    }
}

export interface ArtistSeederDictionary extends AccountSeederDictionary {
    artists: ArtistEntity[];
}

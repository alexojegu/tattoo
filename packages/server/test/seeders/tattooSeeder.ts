import type { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import type { ArtistSeederDictionary } from "./artistSeeder.js";
import TattooFactory from "./factories/tattooFactory.js";
import type TattooEntity from "../../src/entities/tattooEntity.js";

export default class TattooSeeder extends Seeder {
    public async run(entityManager: EntityManager, context: ArtistSeederDictionary): Promise<void> {
        const tattooFactory = new TattooFactory(entityManager);

        context["tattoos"] = context.artists.reduce<TattooEntity[]>((tattoos, artist) => {
            return [...tattoos, ...tattooFactory.make(2, { artist })];
        }, []);

        await entityManager.flush();
    }
}

export interface TattooSeederDictionary extends ArtistSeederDictionary {
    tattoos: TattooEntity[];
}

import type { Dictionary } from "@mikro-orm/core";
import type { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import type ArtistEntity from "../../src/entities/artistEntity.js";
import type TattooEntity from "../../src/entities/tattooEntity.js";
import TattooFactory from "./factories/tattooFactory.js";

export default class TattooSeeder extends Seeder {
    public async run(entityManager: EntityManager, context: Dictionary): Promise<void> {
        const tattooFactory = new TattooFactory(entityManager);

        context["tattoos"] = context["artists"].reduce((tattoos: TattooEntity[], artist: ArtistEntity) => {
            return [...tattoos, ...tattooFactory.make(2, { artist })];
        }, []);

        await entityManager.flush();
    }
}

import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import AccountSeeder from "../seeders/accountSeeder.js";
import ArtistSeeder from "../seeders/artistSeeder.js";
import TattooSeeder from "../seeders/tattooSeeder.js";

export default class DatabaseHelper extends Seeder {
    public async run(entityManager: EntityManager): Promise<void> {
        await this.call(entityManager, [AccountSeeder, ArtistSeeder, TattooSeeder]);
    }
}

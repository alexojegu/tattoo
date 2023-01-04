import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import AccountFactory from "./factories/accountFactory.js";
import TattooFactory from "./factories/tattooFactory.js";

export default class DatabaseSeeder extends Seeder {
    public async run(entityManager: EntityManager): Promise<void> {
        await new AccountFactory(entityManager).create(10);
        await new TattooFactory(entityManager).create(20);
    }
}

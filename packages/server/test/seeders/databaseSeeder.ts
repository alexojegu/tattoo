import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import AccountFactory from "./factories/accountFactory.js";

export default class DatabaseSeeder extends Seeder {
    public async run(entityManager: EntityManager): Promise<void> {
        await new AccountFactory(entityManager).create(10);
    }
}

import type { Dictionary } from "@mikro-orm/core";
import type { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import AccountFactory from "./factories/accountFactory.js";

export default class AccountSeeder extends Seeder {
    public async run(entityManager: EntityManager, context: Dictionary): Promise<void> {
        const accountFactory = new AccountFactory(entityManager);

        context["accounts"] = accountFactory.make(10);

        await entityManager.flush();
    }
}

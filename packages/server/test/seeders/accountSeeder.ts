import type { Dictionary } from "@mikro-orm/core";
import type { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import AccountFactory from "./factories/accountFactory.js";
import type AccountEntity from "../../src/entities/accountEntity.js";

export default class AccountSeeder extends Seeder {
    public async run(entityManager: EntityManager, context: Dictionary): Promise<void> {
        const accountFactory = new AccountFactory(entityManager);

        context["accounts"] = accountFactory.make(10);

        await entityManager.flush();
    }
}

export interface AccountSeederDictionary extends Dictionary {
    accounts: AccountEntity[];
}

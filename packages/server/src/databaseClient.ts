import { MikroORM, type Options } from "@mikro-orm/core";
import type { EntityManager, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { singleton } from "tsyringe";

@singleton()
export default class DatabaseClient {
    private initialized: boolean;
    private options: Options<PostgreSqlDriver>;
    private mikroOrm!: MikroORM<PostgreSqlDriver>;

    public constructor() {
        this.initialized = false;
        this.options = {
            type: "postgresql",
            clientUrl: String(process.env["DATABASE_URL"]),
            dbName: String(process.env["DATABASE_NAME"]),
            entities: ["dist/entities/*.js"],
            entitiesTs: ["src/entities/*.ts"],
        };
    }

    public get manager(): EntityManager {
        if (!this.mikroOrm) {
            throw new Error("Entity Manager cannot be used before connecting to database");
        }

        return this.mikroOrm.em;
    }

    public async connect(): Promise<void> {
        if (await this.mikroOrm?.isConnected()) {
            return;
        }

        if (!this.initialized) {
            this.mikroOrm = await MikroORM.init(this.options, false);
            this.initialized = true;
        }

        await this.mikroOrm.connect();
    }

    public async close(force?: boolean): Promise<void> {
        if (!(await this.mikroOrm.isConnected())) {
            return;
        }

        await this.mikroOrm.close(force);
    }
}

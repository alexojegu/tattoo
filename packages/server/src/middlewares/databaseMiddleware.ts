import { RequestContext } from "@mikro-orm/core";
import type { Application } from "express";
import { inject, injectable } from "tsyringe";
import DatabaseClient from "../databaseClient.js";
import type { WebServerMiddleware } from "../webServer.js";

@injectable()
export default class DatabaseMiddleware implements WebServerMiddleware {
    private databaseClient: DatabaseClient;

    public constructor(@inject(DatabaseClient) databaseClient: DatabaseClient) {
        this.databaseClient = databaseClient;
    }

    public apply(application: Application): void {
        application.use("/", (_req, _res, next) => RequestContext.create(this.databaseClient.manager, next));
    }
}

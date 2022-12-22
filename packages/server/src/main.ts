import "reflect-metadata";
import { container } from "tsyringe";
import DatabaseClient from "./databaseClient.js";
import WebServer from "./webServer.js";

await container.resolve(DatabaseClient).connect();
await container.resolve(WebServer).listen();

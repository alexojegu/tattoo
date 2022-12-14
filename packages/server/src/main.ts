import "reflect-metadata";
import { container } from "tsyringe";
import WebServer from "./webServer.js";

await container.resolve(WebServer).listen();

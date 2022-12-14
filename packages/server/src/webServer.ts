import express, { Application } from "express";
import { createServer, Server } from "node:http";
import { singleton } from "tsyringe";

@singleton()
export default class WebServer {
    private application: Application;
    private server: Server;

    public constructor() {
        this.application = express();
        this.server = createServer(this.application);
    }

    public async listen(): Promise<void> {
        if (this.server.listening) {
            return;
        }

        await new Promise<void>((resolve, reject) => {
            this.server.once("listening", resolve);
            this.server.once("error", reject);
            this.server.listen(Number(process.env["SERVER_PORT"]), process.env["SERVER_HOST"]);
        });
    }

    public async close(): Promise<void> {
        if (!this.server.listening) {
            return;
        }

        await new Promise<void>((resolve, reject) => {
            this.server.once("close", resolve);
            this.server.once("error", reject);
            this.server.close();
        });
    }
}

import express, { Application } from "express";
import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { singleton } from "tsyringe";
import GraphqlMiddleware from "./middlewares/graphqlMiddleware.js";

@singleton()
export default class WebServer {
    private graphqlMiddleware: GraphqlMiddleware;
    private initialized: boolean;
    private application: Application;
    private server: Server;

    public constructor(graphqlMiddleware: GraphqlMiddleware) {
        this.graphqlMiddleware = graphqlMiddleware;
        this.initialized = false;
        this.application = express();
        this.server = createServer(this.application);
    }

    public async listen(): Promise<void> {
        if (this.server.listening) {
            return;
        }

        if (!this.initialized) {
            this.graphqlMiddleware.apply(this.application);
            this.initialized = true;
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

export interface WebServerMiddleware {
    apply(application: Application): void;
}

export interface WebServerContext {
    req: IncomingMessage;
    res: ServerResponse;
}

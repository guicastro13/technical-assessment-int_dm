import { ExpressAdapter } from "./api/ExpressAdapter";
import { Router } from "./api/Router";
import { mongo } from "./bootstrap";
import { LoggerI } from "./helpers/Logger";


export class Server {
    constructor(private logger: LoggerI){}
    async init() {
        try{ 
            await mongo.connect();
            const express = new ExpressAdapter(this.logger);
            const router = new Router(express);
            router.init();
            express.start(3000);
        } catch {
            this.logger.error("Erro ao iniciar o servidor")
        }
    }
}
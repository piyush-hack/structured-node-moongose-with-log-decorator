import { DatabaseInterface } from "server-components";

export class DBInitializerService {
    db: DatabaseInterface;

    constructor(
        db: DatabaseInterface
    ) {
        this.db = db; 
    }

    async init() {
        await this.db.init();
    }

    async cleanup() {
        await this.db.cleanUp(); 
    }
} 
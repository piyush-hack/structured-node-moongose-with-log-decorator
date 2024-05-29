import { GetCasesQuery } from "app-models";
import { DatabaseInterface } from "server-components";
import { logInvocation } from 'log-decorator'
export class AppServerAPI {

    db!: DatabaseInterface;

    constructor(
        db: DatabaseInterface,
    ) {
        this.db = db;
    }

    @logInvocation()
    async getCases(requestid: string, getCasesQuery: GetCasesQuery) {
        return await this.db.getCases(requestid, getCasesQuery);
    }

}
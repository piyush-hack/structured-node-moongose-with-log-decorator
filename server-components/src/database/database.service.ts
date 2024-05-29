import { Case, GetCasesQuery } from "app-models";
import { DatabaseInterface } from "./database.interface";
import { MongodbConnection } from "./mongodb";
import { CasesService } from "./data-connectors";
import { logInvocation } from 'log-decorator'
export class DatabaseService implements DatabaseInterface {

    private mongoDbConnection: MongodbConnection;
    private casesConnector: CasesService;
    constructor(
        mongoDbConnection: MongodbConnection
    ) {
        this.mongoDbConnection = mongoDbConnection;
    }


    public async init() {
        this.casesConnector = new CasesService(this.mongoDbConnection);
    }

    async cleanUp(): Promise<void> {
        await this.mongoDbConnection.cleanUp();
    }

    @logInvocation()
    async createCases(requestid: string, cases: Case[]): Promise<boolean> {
        return await this.casesConnector.createCases(requestid, cases);
    }

    @logInvocation()
    async getCases(requestid: string, casesQuery: GetCasesQuery): Promise<Case[]> {
        return await this.casesConnector.getCases(requestid, casesQuery);
    }
}
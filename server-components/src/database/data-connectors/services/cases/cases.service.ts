import { Case, GetCasesQuery } from "app-models";
import { CasesDBConnector } from "./cases.interface";
import { MongodbConnection } from "../../../mongodb";
import { MongoDBCasesConnector } from "../../database";
import { logInvocation } from "log-decorator";

export class CasesService {


    private casesConnector: CasesDBConnector;

    constructor(
        mongodbConnection: MongodbConnection,
    ) {
        this.casesConnector = new MongoDBCasesConnector(mongodbConnection);
    }

    @logInvocation()
    async createCases(requestid: string, cases: Case[]): Promise<boolean> {
        return await this.casesConnector.createCases(cases);
    }

    @logInvocation()
    async getCases(requestid: string, casesQuery: GetCasesQuery): Promise<Case[]> {
        return await this.casesConnector.getCases(casesQuery);
    }
}
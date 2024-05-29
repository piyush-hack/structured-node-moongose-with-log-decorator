import { CasesDBConnector } from "../../services/cases";
import { Case, CaseOptions, GetCasesQuery } from "app-models";
import { MongodbConnector } from "./mongodb.connector";

export class MongoDBCasesConnector extends MongodbConnector implements CasesDBConnector {

    async createCases(cases: Case[]): Promise<boolean> {
        try {
            await this.CaseModel().insertMany(cases)
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getCases(casesQuery: GetCasesQuery): Promise<Case[]> {
        try {
            const findCasesQuery = {
                [CaseOptions.createdAt]: { $gte: casesQuery.from, $lte: casesQuery.to }
            };
            if (casesQuery?.city?.length) {
                findCasesQuery[CaseOptions.city] = { $in: casesQuery.city }
            }
            return await this.CaseModel().find(findCasesQuery)
                .skip(casesQuery.start)
                .limit(casesQuery.end)
        } catch (error) {
            throw error;
        }
    }

}
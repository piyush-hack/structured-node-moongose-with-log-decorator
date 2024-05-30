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
            const aggregation = [{
                $match:
                {
                    [CaseOptions.city]: { $in: [casesQuery.city] },
                    [CaseOptions.bankName]: casesQuery.bankName,
                    [CaseOptions.propertyName]: casesQuery.propertyName,
                    [CaseOptions.borrowerName]: casesQuery.borrowerName,
                    [CaseOptions.createdAt]: { $gte: 0, $lte: 11111111111111 }
                }
            }];
            return await this.CaseModel().aggregate(aggregation)

        } catch (error) {
            throw error;
        }
    }

}
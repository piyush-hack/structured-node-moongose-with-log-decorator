import { Case, GetCasesQuery } from "app-models";

export interface CasesDBConnector {
    createCases(cases: Case[]): Promise<boolean>
    getCases(casesQuery: GetCasesQuery): Promise<Case[]>
}
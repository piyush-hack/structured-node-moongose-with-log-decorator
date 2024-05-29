import { Case, GetCasesQuery } from "app-models";

export interface DatabaseInterface {
    init(): Promise<void>;
    cleanUp(): Promise<void>;
    createCases(requestid: string, cases: Case[]): Promise<boolean>
    getCases(requestid: string, casesQuery: GetCasesQuery): Promise<Case[]>
}
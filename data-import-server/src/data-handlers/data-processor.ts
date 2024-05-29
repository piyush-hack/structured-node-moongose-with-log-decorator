import { Case, CaseOptions } from "app-models";
import { DatabaseInterface } from "server-components";
import { environment } from "../environment";
import { logInvocation } from "log-decorator";

export class DataProcessor {

    private batch: Set<Record<CaseOptions, any>> = new Set()

    constructor(
        private db: DatabaseInterface
    ) {
    }

    @logInvocation()
    public async processChunk(requestid: string, data: Record<CaseOptions, any>) {
        this.batch.add(data);
        if (this.batch.size === environment.batchSize) {
            await this.processBatch(requestid);
        }
    }

    @logInvocation()
    public async processBatch(requestid: string) {
        const cases: Case[] = [];
        try {
            for (const row of Array.from(this.batch)) {
                const newCase = new Case(row.bankName, row.propertyName, row.borrowerName, row.city, Date.now(), Date.now());
                cases.push(newCase);
            }
            await this.db.createCases(requestid, cases);
        } catch (error) {
            console.log(error);
        }
        this.batch.clear();
    }

}

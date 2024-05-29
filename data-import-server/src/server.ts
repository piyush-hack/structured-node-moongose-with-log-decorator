import { CaseOptions } from "app-models";
import { FileReadService } from "./data-fetcher";
import { DataImportJob } from "./data-import-job";
import { DatabaseService, MongodbConnection } from 'server-components'
import { environment } from './environment'

const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQy30Ma5Tqxc0LhVzK-q3OJsYudEvYozPZOU78wWex-zejOJeSj_zrb_4F6hmaeBAMDCtAqvHcZ3l-x/pub?output=csv';
const headerMappings: Record<string, CaseOptions> = {
    "Head 1": CaseOptions.bankName,
    "Head 2": CaseOptions.propertyName,
    "Head 3": CaseOptions.borrowerName,
    "Head 4": CaseOptions.city
};

async function init() {
    const dbConnection = new MongodbConnection(environment.DB_NAME, environment.dbConfig);
    await dbConnection.init()

    const db = new DatabaseService(dbConnection);
    await db.init();

    const fileReadService = new FileReadService(db);
    const job = new DataImportJob(fileReadService);
    await job.scheduleJob(`${Date.now()}`, csvUrl, headerMappings);
}

init()
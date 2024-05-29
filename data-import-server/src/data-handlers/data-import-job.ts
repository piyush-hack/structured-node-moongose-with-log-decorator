import * as cron from 'node-cron';
import { DataFetcherInterface } from '../data-fetcher';
import { CaseOptions } from 'app-models';
import { logInvocation } from 'log-decorator';
export class DataImportJob {
    constructor(private dataFetcher: DataFetcherInterface) { }

    @logInvocation()
    public async scheduleJob(requestid: string, csvUrl: string, headerMappings: Record<string, CaseOptions>) {
        // cron.schedule('0 10,17 * * *', async () => {
        console.log('Scheduled job started...');
        await this.dataFetcher.fetchData(requestid, csvUrl, headerMappings);
        console.log('Scheduler has been completed.');
        //     }, {
        //         scheduled: true,
        //         timezone: "America/New_York"
        //     });
    }

}

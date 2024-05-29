import axios from 'axios';
import { StreamProcessor } from '../utils/stream-processor';
import { DataFetcherInterface } from './data-fetcher-interface';
import { CaseOptions } from 'app-models';
import * as csv from 'csv-parser';
import { DatabaseInterface } from 'server-components';
import { logInvocation } from 'log-decorator';

export class FileReadService implements DataFetcherInterface {
  private streamProcessor: StreamProcessor;
  constructor(
    db: DatabaseInterface
  ) {
    this.streamProcessor = new StreamProcessor(db);

  }

  @logInvocation()
  public async fetchData(requestid: string, csvUrl: string, headerMappings: Record<string, CaseOptions>): Promise<void> {
    console.log('Fetching data from:', csvUrl);
    const response = await axios({
      method: 'get',
      url: csvUrl,
      responseType: 'stream'
    });

    response.data
      .pipe(csv())
      .pipe(this.streamProcessor.processCsvStream(requestid, headerMappings))
      .on('finish', async () => {
        await this.streamProcessor.processRemainingData(requestid)
      });
  }

}

import { Transform, Writable } from 'stream';
import { DataProcessor } from '../data-handlers/data-processor';
import { CaseOptions } from 'app-models';
import { DatabaseInterface } from 'server-components';
import { environment } from '../environment';
import { logInvocation } from 'log-decorator';

export class StreamProcessor {

  private dataProcessor: DataProcessor;
  constructor(
    db: DatabaseInterface
  ) {
    this.dataProcessor = new DataProcessor(db);
  }

  @logInvocation()
  public processCsvStream(requestid: string, headerMappings: Record<string, CaseOptions>): Transform {
    return new Transform({
      objectMode: true,
      transform: async (chunk, encoding, callback) => {
        const processedChunk: Record<string, any> = {};

        for (const key in chunk) {
          if (headerMappings[key]) {
            processedChunk[headerMappings[key]] = chunk[key];
          }
        }

        await this.dataProcessor.processChunk(`${requestid}`, processedChunk);
        callback();
      }
    })
  }

  @logInvocation()
  async processRemainingData(requestid: string) {
    await this.dataProcessor.processBatch(requestid);
  }
}

import { CaseOptions } from 'app-models'
export interface DataFetcherInterface {
    fetchData(requestid: string, csvUrl: string, headerMappings: Record<string, CaseOptions>): Promise<void>;
}

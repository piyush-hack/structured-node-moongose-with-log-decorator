export interface LoggerInterface {
    log(requestId: string, functionName: string, data: any): Promise<void>;
}

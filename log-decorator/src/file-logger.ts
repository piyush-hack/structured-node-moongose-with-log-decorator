import { promises as fsPromises } from 'fs';
import * as path from 'path';

export class FileLogger {
    private logDirectory: string;

    constructor(logDirectory: string = path.join(__dirname, '..', '..', 'logs')) {
        this.logDirectory = logDirectory;
        // this.ensureLogDirectoryExists();
    }

    // private async ensureLogDirectoryExists() {
    //     try {
    //         await fsPromises.mkdir(this.logDirectory, { recursive: true });
    //     } catch (err) {
    //         // if (err.code !== 'EEXIST') throw err; // Only throw if error is not about the directory already existing
    //     }
    // }

    async log(requestId: string, functionName: string, data?: any): Promise<void> {
        // const logFileName = path.join(this.logDirectory, `${requestId}.json`);
        const logContent = {
            requestId,
            functionCalled: functionName,
            data
        };
        console.log(logContent)
        // await fsPromises.appendFile(logFileName, JSON.stringify(logContent) + '\n');
    }
}

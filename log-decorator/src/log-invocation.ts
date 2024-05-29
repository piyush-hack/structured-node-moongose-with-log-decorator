import { FileLogger } from "./file-logger";
import { LoggerInterface } from "./logger-interface";

const logger: LoggerInterface = new FileLogger(); // can be used by logger when called also to log according to reuirement

export function logInvocation() {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;
        const className = target.constructor.name;  // Getting the class name

        descriptor.value = function (...args: any[]) {
            if (args && args.length && args[0] && typeof args[0] === 'string' && propertyKey) {
                const memoryUsed = (process?.memoryUsage()?.heapUsed || 0) / 1024 / 1024;
                logger.log(args[0], `Calling ${className}.${propertyKey}() - ${memoryUsed?.toFixed(2)} MB`, { details: JSON.stringify(args, null, 2) });
            } else {
                if (propertyKey) {
                    logger.log(`logInvocation-error`, `Missing parameters ${className}.${propertyKey}()`, new Error('Missing Parameters'));
                }
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    }

}
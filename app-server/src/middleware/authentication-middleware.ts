import { Request, Response, NextFunction } from 'express';
import { AppServerAPI } from '../app-server-api';

export function authentcationMiddleWare(appServerApi: AppServerAPI) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.headers?.authorization?.startsWith('Bearerapi ') && req.method !== 'OPTIONS') {
                const token = req.headers.authorization.split('Bearerapi ')[1];
                // verify user here
            }

            next();
        } catch (err) {
            console.log('401');
            res.sendStatus(401);
        }
    }
}

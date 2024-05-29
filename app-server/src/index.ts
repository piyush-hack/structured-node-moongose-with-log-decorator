import express, { Express, Request, Response } from "express";
import { AppServerAPI, DBInitializerService } from "./app-server-api";
import { DatabaseService, MongodbConnection } from "server-components";
var cors = require('cors')
var bodyParser = require('body-parser')

import CasesRouter = require('./cases-router');

import { ApiAuthorization } from "./api-authorization";
import { APIPathFragments } from "app-models";

const casesRouter = express.Router();
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors())
app.use(`/${APIPathFragments.CASES}`, casesRouter);

let appServerApi: AppServerAPI;
let apiAuthorization: ApiAuthorization;

function appInit(mongoDbConnection: MongodbConnection) {

    const db = new DatabaseService(mongoDbConnection);
    const dbInitializerService = new DBInitializerService(db);
    dbInitializerService.init();

    appServerApi = new AppServerAPI(db);
    apiAuthorization = new ApiAuthorization(db);
    CasesRouter.router(casesRouter, appServerApi, apiAuthorization)

    app.get("/", async (req: Request, res: Response) => {
        res.send("Heartbeat")
    });

}

export = {
    app,
    appInit
};
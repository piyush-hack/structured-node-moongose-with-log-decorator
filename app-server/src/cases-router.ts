import express = require('express');
import cors = require('cors');
import { AppServerAPI } from './app-server-api';
import { ApiAuthorization } from './api-authorization';
import { authentcationMiddleWare } from './middleware';
import { APIPathFragments, GetCasesQuery, ServerErrors } from 'app-models';

export function router(
	router: express.Router,
	appServerApi: AppServerAPI,
	apiAuthorization: ApiAuthorization
) {
	router.use(cors());

	// authentication layer
	router.use(authentcationMiddleWare(appServerApi));
	router.use((req: any, res, next) => {
		req['id'] = getRequestid(req);
		next();
	})

	// in case of deploying it to lambda use request id from lambda context
	// router.use((req: any, res, next: any) => {
	// 	let lambdaContext = (global as any)?.lambdaContext;
	// 	req['id'] = lambdaContext?.awsRequestId ? lambdaContext?.awsRequestId : req['id'];
	// 	next();
	// });

	router.options('*', async (req, res) => {
		try {
			res.set({
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "Access-Control-Allow-Origin, X-Requested-With, content-type, Accept",
				"Access-Control-Allow-Methods": "POST"
			});
			res.status(200).send();
		} catch (error) {
			console.log('error')
		}
	});

	router.get('/heartbeat', (req, res) => {
		try {
			res.send('❤️❤️❤️❤️❤️');
		} catch (error) {
			res.status(503).send('💔💔');
		}
	});

	router.get('/shutdown', () => {
		process.exit(1);
	});

	router.post(`/`, async (req, res) => {
		try {
			const { getCasesQueryObject } = req.body;
			const getCasesQuery = GetCasesQuery.fromJSON(getCasesQueryObject)
			if (getCasesQuery) {
				// authorization layer
				const isAuthorized = await apiAuthorization.noAuth(getRequestid(req));
				if (isAuthorized) {
					const userToken = await appServerApi.getCases(getRequestid(req), getCasesQuery);
					res.send(userToken);
				} else {
					res.status(403).send(ServerErrors.NOT_AUTHORIZED);
				}
			} else {
				res.status(403).send(ServerErrors.INSUFFICENT_INFO);
			}
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	})

	function getRequestid(req: any) {
		return req.id || `${Date.now()}`;
	}

}

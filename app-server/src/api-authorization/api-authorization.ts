import { Request } from 'express';
import { DatabaseInterface } from 'server-components';

export class ApiAuthorization {
	readonly superAdmins = ['piyushpuniya2001@gmail.com', 'akashgoyal0312@gmail.com']

	db: DatabaseInterface;

	constructor(
		db: DatabaseInterface,
	) {
		this.db = db;
	}


	async noAuth(requestid: string) {
		try {
			return true;
		} catch (error) {
			return false; 
		}
	}

}


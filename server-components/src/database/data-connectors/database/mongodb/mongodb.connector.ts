
import { Model, Schema } from 'mongoose';
import { MongodbConnection } from '../../../mongodb';
import { Case, CaseSchema } from 'app-models';
import { CollectionMapper } from '../../../collection-mapper';

export abstract class MongodbConnector {

	protected mongodbConnection: MongodbConnection;
	private models: Map<Schema, Model<any>> = new Map();

	constructor(mongodbConnection: MongodbConnection) {
		this.mongodbConnection = mongodbConnection;
	}

	protected CaseModel() {
		return this.getModel<Case>(CollectionMapper.CASES, CaseSchema)
	}

	protected getModel<T>(collection: CollectionMapper, schema: Schema) {
		if (!this.mongodbConnection.getDb()) {
			return null;
		}
		if (!this.models.get(schema)) {
			const model = this.mongodbConnection.getDb().model<T>(collection, schema);
			this.models.set(schema, model)
		}
		return this.models.get(schema);
	}
}
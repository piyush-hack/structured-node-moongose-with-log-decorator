import mongoose from 'mongoose';

export class MongodbConnection {
    static SIGNATURE = 'MongooseConnection';
    private dbName: string;
    private mongodbUrl: string;

    constructor(dbName: string, mongodbUrl: string) {
        if (!dbName) throw new Error("Database name must be provided");
        this.dbName = dbName;
        this.mongodbUrl = mongodbUrl; // This should be your full connection string
    }

    async init() {
        try {
            await mongoose.connect(this.mongodbUrl, {
                dbName: this.dbName,
            });
            console.log("MongoDB initialized");
        } catch (error) {
            console.error("Failed to connect to MongoDB", error);
        }
    }

    getDb() {
        if (!mongoose.connection.readyState) {
            console.log("Database connection is not established");
            return null;
        }
        return mongoose.connection; // Access to the native connection
    }

    async cleanUp() {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB");
        } catch (error) {
            console.error("Failed to disconnect properly", error);
        }
    }
}

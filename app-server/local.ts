const { environment } = require('./environment');
const {
    app,
    appInit
} = require("./src/index");
import { MongodbConnection } from 'server-components';

init();

async function init() {
    try {
        const mongoDbConnection = new MongodbConnection(environment.DB_NAME , environment.dbConfig)

        app.listen(environment.port, async () => {
            console.log(`Server Start at ${environment.port}`);
            await mongoDbConnection.init();
            appInit(mongoDbConnection);
        });
    } catch (error) {
        console.log({ error });
    }
}


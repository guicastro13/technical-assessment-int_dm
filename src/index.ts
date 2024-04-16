import { ExpressAdapter } from './api/ExpressAdapter';
import { Router } from './api/Router';
import { MongoDB } from './database/mongodb/mongodb';

async function initialize() {
    const mongoDB = new MongoDB('mongodb://mongodb:27017/techinical_test');
    await mongoDB.connect();

    const server = new ExpressAdapter();
    const router = new Router(server);
    router.init();
    server.start(3000);
}

initialize().catch(err => {
    console.error('error when initializing: ', err);
});
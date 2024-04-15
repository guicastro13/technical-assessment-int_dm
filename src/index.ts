import { ExpressAdapter } from './api/ExpressAdapter';
import { Router } from './api/Router';
import { MongoDB } from './database/mongodb/mongodb';

new MongoDB('mongodb://localhost:27017/techinical_test').connect();

const server = new ExpressAdapter();
const router = new Router(server);
router.init();
server.start(3000);

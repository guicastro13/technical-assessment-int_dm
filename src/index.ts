import { ExpressAdapter } from './api/ExpressAdapter';
import { Router } from './api/Router';

const server = new ExpressAdapter();
const router = new Router(server);
router.init();
server.start(3000);

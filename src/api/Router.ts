import { logController, regionsController, userController } from '../bootstrap';
import { HttpServer } from './HttpServer';

export class Router {
  private server: HttpServer;
  constructor(server: HttpServer) {
    this.server = server;
  }

  init() {
    this.server.on({
      path: '',
      method: 'get',
      handler: async () => {
        return { body: 'Funcionando', statusCode: 200 };
      },
    });

    this.server.on({
      path: '/user/create',
      method: 'post',
      handler: userController.register,
    });

    this.server.on({
      path: '/user/get-all',
      method: 'get',
      handler: userController.getAll,
    });

    this.server.on({
      path: '/user/get-one/:user_id',
      method: 'get',
      handler: userController.getById,
    });

    this.server.on({
      path: '/user/update/:user_id',
      method: 'put',
      handler: userController.update,
    });

    this.server.on({
      path: '/user/delete/:user_id',
      method: 'delete',
      handler: userController.delete,
    });

    this.server.on({
      path: '/region/create',
      method: 'post',
      handler: regionsController.create,
    });

    this.server.on({
      path: '/region/get-all',
      method: 'get',
      handler: regionsController.getAll,
    });

    this.server.on({
      path: '/region/get-one/:region_id',
      method: 'get',
      handler: regionsController.getById,
    });

    this.server.on({
      path: '/region/update/:region_id',
      method: 'put',
      handler: regionsController.update,
    });

    this.server.on({
      path: '/region/delete/:region_id',
      method: 'delete',
      handler: regionsController.delete,
    });

    this.server.on({
      path: '/regions',
      method: 'get',
      handler: regionsController.getRegionsCloseToCoordinate
    })

    this.server.on({
      path: '/relatorio/generate',
      method: 'post',
      handler: logController.generateCsvReport
    })
  }
}

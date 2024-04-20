import { HttpError } from '../errors/HttpError';
import express, { Express } from 'express';
import cors from 'cors';
import { HttpServer, RouteOptions } from './HttpServer';
import { ZodError } from 'zod';
import { LoggerI } from '../helpers/Logger';

export class ExpressAdapter implements HttpServer {
  private _app: Express;

  constructor(private logger: LoggerI) {
    this._app = express();
    this.init();
  }

  private init() {
    this._app.use(cors());
    this._app.use(express.json());
  }

  on(options: RouteOptions) {
    const { method, path, handler } = options;

    this._app[method](path, async (req, res) => {
      this.logger.info(`Rota acessada: Método: ${req.method}, Caminho: ${req.url}`);
      try {
        const { statusCode, body, filePath } = await handler(req);
        res.statusCode = statusCode;
        if (filePath) res.sendFile(filePath);
        return res.json(body);
      } catch (error) {
        if (error instanceof HttpError) {
          this.logger.error(`Error HTTP: ${error.statusCode}, ${error.message}`)
          return res.status(error.statusCode).json({ error: error.message });
        } else if (error instanceof ZodError) {
          const zodErrors: Record<string, string> = {};
          error.issues.forEach((zodError) => {
            const [path] = zodError.path;
            zodErrors[path ?? 'error'] = zodError.message;
            this.logger.error(`Error ZOD: ${zodError.message}`)
          });
          return res.status(400).json({ errors: zodErrors });
        } else {
          this.logger.error("Error desconhecido no express")
          return res.status(500).json({ error: 'Erro desconhecido ao processar requisição.' });
        }
      }
    });
  }

  start(port: number) {
    this._app.listen(port, () => this.logger.info(`Server running on http://localhost:${port}/`));
  }
}

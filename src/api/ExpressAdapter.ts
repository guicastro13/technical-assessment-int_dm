import { HttpError } from '../errors/HttpError';
import express, { Express } from 'express';
import cors from 'cors';
import { HttpServer, RouteOptions } from './HttpServer';
import { ZodError } from 'zod';

export class ExpressAdapter implements HttpServer {
  private _app: Express;

  constructor() {
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
      try {
        const { statusCode, body } = await handler(req);
        res.statusCode = statusCode;
        return res.json(body);
      } catch (error) {
        if (error instanceof HttpError) {
          return res.status(error.statusCode).json({ error: error.message });
        } else if (error instanceof ZodError) {
          const zodErrors: Record<string, string> = {};
          error.issues.forEach((zodError) => {
            const [path] = zodError.path;
            zodErrors[path ?? 'error'] = zodError.message;
          });
          return res.status(400).json({ errors: zodErrors });
        } else {
          return res.status(400).json({ error: 'Erro desconhecido ao processar requisição.' });
        }
      }
    });
  }

  start(port: number) {
    this._app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
  }
}

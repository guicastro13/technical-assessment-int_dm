import { HttpError } from './HttpError';

export class NoContent extends HttpError {
  constructor() {
    super('Resposta sem conteúdo', 204);
  }
}

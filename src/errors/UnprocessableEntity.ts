import { HttpError } from './HttpError';

export class UnprocessableEntity extends HttpError {
  constructor(entity?: string) {
    let message;
    if (entity) {
      message = 'Não foi possível processar as informações da entidade ' + entity;
    } else {
      message = 'Não foi possível processar as informações';
    }

    super(message, 422);
  }
}

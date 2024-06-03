import { HttpError } from './HttpError';

export class InvalidParamsError extends HttpError {
  constructor(message: string) {
    super(message, 422);
  }
}

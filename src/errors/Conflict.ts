import { HttpError } from "./HttpError";

export class Conflict extends HttpError {
    constructor(message: string) {
        super(message, 409);
      }
}
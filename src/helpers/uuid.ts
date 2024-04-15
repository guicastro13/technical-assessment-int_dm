import { uuidv7 } from 'uuidv7';

export class Uuid {
  static generate() {
    return uuidv7();
  }
}

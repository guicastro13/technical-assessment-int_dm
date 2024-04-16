import { Database } from '../database';
import mongoose from'mongoose';

export class MongoDB implements Database {
  private uri;
  constructor(uri: string) {
    this.uri = uri;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri);
      console.log('Conectado ao banco de dados MongoDB');
    } catch (err) {
      console.error('Erro na conexão com o banco de dados:', err);
    }
  }

  close() {
    mongoose.connection.close();
  }
}

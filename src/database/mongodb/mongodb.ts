import { Database } from '../database';
import mongoose from'mongoose';
import { LoggerI } from '../../helpers/Logger';

export class MongoDB implements Database {
  private url = process.env.MONGO_URL as string
  constructor(private logger: LoggerI) {}

  async connect() {
    try {
      await mongoose.connect(this.url);
      this.logger.info('Conectado ao banco de dados MongoDB');
    } catch (err) {
      this.logger.error('Erro na conexão com o banco de dados');
      if (err === 'string' || err === undefined) throw new Error(err);
      throw new Error()
    }
  }

  close() {
    mongoose.connection.close();
    this.logger.error("Banco de dados encerrado")
  }
}
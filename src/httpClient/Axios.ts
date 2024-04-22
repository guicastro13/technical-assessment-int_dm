import axios, { AxiosRequestConfig } from 'axios';
import { LoggerI } from '../helpers/Logger';

export interface HttpClient {
  get: <R>(url: string, options?: AxiosRequestConfig) => Promise<R | null>;
  post: <R>(url: string, body: any, options?: AxiosRequestConfig) => Promise<R | null>;
}

export class AxiosAdapter implements HttpClient {
  constructor(private logger: LoggerI) {}

  async get<R>(url: string, options?: AxiosRequestConfig): Promise<R | null> {
    try {
      const response = await axios.get<R>(url, options);
      return response.data;
    } catch {
      this.logger.error('Erro ao realizar a solicitação GET');
      return null;
    }
  }

  async post<R>(url: string, body: any, options?: AxiosRequestConfig): Promise<R | null> {
    try {
      const response = await axios.post<R>(url, body, options);
      return response.data;
    } catch {
      this.logger.error('Erro ao realizar a solicitação POST');
      return null;
    }
  }
}

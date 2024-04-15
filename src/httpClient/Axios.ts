import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export interface HttpClient {
  get: <R>(url: string, options?: AxiosRequestConfig) => Promise<R>;
  post: <R>(url: string, body: any, options?: any) => Promise<R>;
}

export class AxiosAdapter implements HttpClient {
  async get<R>(url: string, options?: AxiosRequestConfig) {
    const response = await axios.get<R>(url, options);
    return response.data;
  }

  async post<R>(url: string, body: any, options?: AxiosRequestConfig) {
    const response = await axios.post<R>(url, body, options);
    return response.data;
  }
}

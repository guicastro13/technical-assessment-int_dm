export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface HttpRequest {
  headers: {
    authorization?: string;
  };
  query?: { [key: string]: unknown };
  params?: { [key: string]: unknown };
  body?: { [key: string]: unknown };
}

export interface HttpResponse {
  statusCode: number;
  body?: unknown;
  filePath?: string;
}

export type HttpHandler = (request: HttpRequest) => Promise<HttpResponse>;

export type RouteOptions = {
  method: HttpMethod;
  path: string;
  handler: HttpHandler;
};

export interface HttpServer {
  on: (options: RouteOptions) => void;
  start: (port: number) => void;
}

export interface Database {
  connect(): Promise<void>;
  close(): void;
}

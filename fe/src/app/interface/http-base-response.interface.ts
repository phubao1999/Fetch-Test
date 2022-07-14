export interface HttpBaseResponse<T> {
  code: number;
  data: T;
  message: string;
}

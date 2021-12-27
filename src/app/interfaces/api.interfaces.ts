export interface IResponse<T> {
  success: true;
  data: T;
  error?: string;
}

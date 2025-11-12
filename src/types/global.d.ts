export {};

declare global {
  interface IBackendRes<T> {
    statusCode: number;
    error: string;
    message: object;
    data: T;
  }

  interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
  }
}

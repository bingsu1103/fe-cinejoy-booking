export {};

declare global {
  interface IBackendRes<T> {
    statusCode: number | string;
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

  interface IFetchUserRes {
    id: number;
    username: string;
    email: string;
  }

  interface ILoginRes {
    accessToken: string;
    refreshToken: string;
    user: IFetchUserRes;
  }

  interface IRegisterRes {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
}

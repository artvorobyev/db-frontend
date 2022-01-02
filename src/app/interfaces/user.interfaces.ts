export interface IUser {
  id: number;
  login: string;
  email: string;
}

export interface IUserResponse {
  user: IUser;
}

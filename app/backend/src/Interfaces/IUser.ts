export default interface IUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export type ID = number;

export type Identifiable = { id: ID };

export interface ILogin {
  email: string;
  password: string;
}

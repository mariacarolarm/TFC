import { ILogin } from './IUser';

export interface IUserModel {
  findByEmail(email: ILogin['email']): Promise<ILogin | null>,
}

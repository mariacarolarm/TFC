import User from '../database/models/UsersModel';
import { ILogin } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = User;

  async findByEmail(email: ILogin['email']): Promise<ILogin | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return { email: user.email, password: user.password, role: user.role };
  }
}

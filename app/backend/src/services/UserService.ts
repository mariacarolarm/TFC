import * as bcrypt from 'bcryptjs';
import IUser, { ILogin } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';
import UserModel from '../models/UserModel';
import { IToken } from '../Interfaces/IToken';
import JWT from '../utils/JWT';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
  }
}

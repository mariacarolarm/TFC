import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import UserService from '../services/UserService';
import JWT from '../utils/JWT';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.userService.login(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async getRole(req: Request, res: Response): Promise<Response> {
    if (req.headers.authorization === undefined) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const validToken = await JWT.verify(token);
    if (typeof validToken === 'string') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const checkUser = await this.userService.getUserRole(validToken.email);
    if (checkUser.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(checkUser.status)).json(checkUser.data);
    }
    return res.status(200).json(checkUser.data);
  }
}

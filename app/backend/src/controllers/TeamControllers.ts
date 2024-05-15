import { Request, Response } from 'express';
import TeamsService from '../services/TeamService';

export default class TeamsController {
  private service = new TeamsService();

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.service.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }
}

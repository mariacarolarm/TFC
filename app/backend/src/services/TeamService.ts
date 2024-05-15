import Teams from '../database/models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  private teamsModel = Teams;

  async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
};

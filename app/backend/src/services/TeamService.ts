import Teams from '../database/models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  private teamsModel = Teams;

  async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.findByPk(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}

import Teams from "../database/models/TeamsModel";
import ITeams from "../Interfaces/ITeams";
import { ServiceResponse } from "../Interfaces/ServiceResponse";

export default class TeamsService {
  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await Teams.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
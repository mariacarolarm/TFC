import MatchModel from '../models/MatchModel';
import Imatches from '../Interfaces/IMatches';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  private matchesModel = Matches;
  private model = new MatchModel();

  static getMatches() {
    return Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const match = await this.matchesModel.findOne({ where: { id } });

    if (!match) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    match.inProgress = false;
    await match.save();

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createMatch(match: Imatches): Promise<ServiceResponse<Imatches>> {
    const newMatch = await this.matchesModel.create({ ...match, inProgress: true });

    return { status: 'SUCCESSFUL', data: newMatch };
  }

  public async updateMatch(id: number, data: Imatches): Promise<ServiceResponse<ServiceMessage>> {
    const updatedMatch = await this.model.updateOngoingMatch(id, data);
    if (!updatedMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }
}

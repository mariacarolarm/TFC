import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  private matchesModel = Matches;

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
}

import { IMatchModelCreator } from '../Interfaces/IMatchesModel';
import Matches from '../database/models/MatchesModel';
import Imatches from '../Interfaces/IMatches';

export default class MatchModel implements IMatchModelCreator<Imatches> {
  private model = Matches;

  async create(data: Imatches): Promise<Imatches> {
    const dbData = await this.model.create({ ...data, inProgress: true });

    const { id, homeTeamId, homeTeamGoals, awayTeamId,
      awayTeamGoals, inProgress }: Imatches = dbData;
    return {
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    };
  }
}

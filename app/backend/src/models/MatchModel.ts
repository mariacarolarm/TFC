import { IMatchModelCreator } from '../Interfaces/IMatchesModel';
import Matches from '../database/models/MatchesModel';
import Imatches, { NewEntity } from '../Interfaces/IMatches';
import Teams from '../database/models/TeamsModel';

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

  async updateOngoingMatch(
    id: Imatches['id'],
    data: Partial<NewEntity<Imatches>>,
  ): Promise<Imatches | null> {
    const updateMatches = await this.model.findOne({ where: { id },
      include: [{ model: Teams, as: 'homeTeam' }, { model: Teams, as: 'awayTeam' }] });
    if (updateMatches == null) return null;
    const { homeTeamGoals, awayTeamGoals } = data;
    await updateMatches.update({ homeTeamGoals, awayTeamGoals });
    return updateMatches;
  }
}

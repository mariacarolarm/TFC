import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import { IBoard } from '../Interfaces/IBoard';

export default class LeaderboardService {
  private calculateTotalGames = (matches: Matches[], teamId: number): number =>
    matches.filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId).length;

  private calculateTotalVictories = (matches: Matches[], teamId: number): number =>
    matches.filter((match) =>
      (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)
      || (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)).length;

  private calculateTotalDraws = (matches: Matches[], teamId: number): number =>
    matches.filter((match) =>
      (match.homeTeamId === teamId || match.awayTeamId === teamId)
          && match.homeTeamGoals === match.awayTeamGoals).length;

  private calculateGoals = (matches: Matches[], teamId: number):
  { goalsFavor: number, goalsOwn: number } => {
    const goalsFavor = matches.reduce((acc, match) =>
      acc + (match.homeTeamId === teamId ? match.homeTeamGoals : match.awayTeamGoals), 0);

    const goalsOwn = matches.reduce((acc, match) =>
      acc + (match.homeTeamId === teamId ? match.awayTeamGoals : match.homeTeamGoals), 0);

    return { goalsFavor, goalsOwn };
  };

  private calculatePointsAndEfficiency = (
    totalVictories: number,
    totalDraws: number,
    totalGames: number,
  ): { totalPoints: number, efficiency: number } => {
    const totalPoints = totalVictories * 3 + totalDraws;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    return { totalPoints, efficiency };
  };

  private calculateTeamStats = (matches: Matches[], teamId: number): IBoard => {
    const totalGames = this.calculateTotalGames(matches, teamId);
    const totalVictories = this.calculateTotalVictories(matches, teamId);
    const totalDraws = this.calculateTotalDraws(matches, teamId);
    const { goalsFavor, goalsOwn } = this.calculateGoals(matches, teamId);
    const { totalPoints, efficiency } = this
      .calculatePointsAndEfficiency(totalVictories, totalDraws, totalGames);

    return {
      name: '',
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: totalGames - totalVictories - totalDraws,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency,
    };
  };

  public getHomeLeaderboard = async (): Promise<IBoard[]> => {
    const finishedMatches = await Matches
      .findAll({ where: { inProgress: false }, include: [{ model: Teams, as: 'homeTeam' }] });
    const teams = await Teams.findAll();

    const homeLeaderboard = teams.map((team) => {
      const homeMatches = finishedMatches.filter((match) => match.homeTeamId === team.id);
      const teamStats = this.calculateTeamStats(homeMatches, team.id);
      return { ...teamStats, name: team.teamName };
    });

    return this.sortLeaderboard(homeLeaderboard);
  };

  public getAwayLeaderboard = async (): Promise<IBoard[]> => {
    const finishedMatches = await Matches
      .findAll({ where: { inProgress: false }, include: [{ model: Teams, as: 'awayTeam' }] });
    const teams = await Teams.findAll();

    const awayLeaderboard = teams.map((team) => {
      const awayMatches = finishedMatches.filter((match) => match.awayTeamId === team.id);
      const teamStats = this.calculateTeamStats(awayMatches, team.id);
      return { ...teamStats, name: team.teamName };
    });

    return this.sortLeaderboard(awayLeaderboard);
  };

  public getLeaderboard = async (): Promise<IBoard[]> => {
    const finishedMatches = await Matches.findAll({ where: { inProgress: false } });
    const teams = await Teams.findAll();

    const leaderboard = teams.map((team) => {
      const teamStats = this.calculateTeamStats(finishedMatches, team.id);
      return { ...teamStats, name: team.teamName };
    });

    return this.sortLeaderboard(leaderboard);
  };

  private sortLeaderboard = (leaderboard: IBoard[]): IBoard[] =>
    leaderboard.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
}

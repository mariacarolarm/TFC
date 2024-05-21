import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private service = new LeaderboardService();

  public async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.service.getLeaderboard();
    return res.status(200).json(leaderboard);
  }

  public async getHomeLeaderboard(req: Request, res: Response): Promise<Response> {
    const homeLeaderboard = await this.service.getHomeLeaderboard();
    return res.status(200).json(homeLeaderboard);
  }

  public async getAwayLeaderboard(req: Request, res: Response): Promise<Response> {
    const awayLeaderboard = await this.service.getAwayLeaderboard();
    return res.status(200).json(awayLeaderboard);
  }
}

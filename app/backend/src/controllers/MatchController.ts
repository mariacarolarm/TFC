import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  private service = new MatchesService();

  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    const serviceResponse = await MatchesService.getMatches();
    if (inProgress === 'true') {
      const ongoingMatches = serviceResponse.filter((match) => match.inProgress === true);
      return res.status(200).json(ongoingMatches);
    }
    if (inProgress === 'false') {
      const finishedMatches = serviceResponse.filter((match) => match.inProgress === false);
      return res.status(200).json(finishedMatches);
    }
    res.status(200).json(serviceResponse);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.service.finishMatch(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}

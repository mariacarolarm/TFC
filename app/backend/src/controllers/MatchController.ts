import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const serviceResponse = await MatchesService.getMatches();
    res.status(200).json(serviceResponse);
  }
}

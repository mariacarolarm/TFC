import { Router } from 'express';
import MatchesController from '../controllers/MatchController';

const router = Router();

router.get('/', MatchesController.getAllMatches);

export default router;

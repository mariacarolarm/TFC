import { Router } from 'express';
import MatchesController from '../controllers/MatchController';
import Validations from '../middlewares/validations';

const router = Router();
const matchesController = new MatchesController();

router.get('/matches', MatchesController.getAllMatches);
router.patch(
  '/matches/:id/finish',
  Validations.validateToken,
  (req, res) => matchesController.finishMatch(req, res),
);

export default router;

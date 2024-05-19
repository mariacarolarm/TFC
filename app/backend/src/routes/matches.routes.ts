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
router.patch(
  '/matches/:id',
  Validations.validateToken,
  (req, res) => matchesController.updateMatch(req, res),
);
router.post(
  '/matches',
  Validations.validateToken,
  (req, res) => matchesController.newMatch(req, res),
);

export default router;

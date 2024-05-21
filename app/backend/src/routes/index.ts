import { Router } from 'express';
import teamsRouter from './team.routes';
import userRouter from './user.routes';
import matchesRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/', matchesRouter);
router.use('/', leaderboardRouter);

export default router;

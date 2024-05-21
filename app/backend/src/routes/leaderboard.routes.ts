import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/leaderboard', (req, res) => leaderboardController.getLeaderboard(req, res));
router.get('/leaderboard/home', (req, res) => leaderboardController.getHomeLeaderboard(req, res));
router.get('/leaderboard/away', (req, res) => leaderboardController.getAwayLeaderboard(req, res));

export default router;

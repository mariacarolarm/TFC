import { Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validations';

const userController = new UserController();

const router = Router();

router.post('/', Validations.validateLogin, (req, res) => userController.login(req, res));

export default router;

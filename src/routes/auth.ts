import { Router } from 'express';
import UserController from '../controllers/UserController';
import { auth } from '../middlewares/auth';

const routes = Router();
const userController = new UserController();

routes.post('/session', userController.login);
routes.post('/users', userController.saveUser);
routes.get('/users/:id', auth, userController.listUser);

export default routes;

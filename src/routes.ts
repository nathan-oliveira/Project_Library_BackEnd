import { Router, Request, Response } from 'express';
import UserController from './controllers/UserController';
import { auth } from './middlewares/auth';

const routes = Router();
const userController = new UserController();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'API ON' });
})

routes.post('/session', userController.login);
routes.get('/users', auth, userController.listUser);
routes.post('/users', userController.saveUser);

export default routes;
import { Router, Request, Response } from 'express';

import authRoutes from './auth';
import tasksRoutes from './tasks'

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'API ON' });
})

routes.use('/', authRoutes);
routes.use('/', tasksRoutes);

export default routes;

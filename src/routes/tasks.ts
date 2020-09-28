import { Router } from 'express';
import TasksController from '../controllers/TasksController';
import { auth } from '../middlewares/auth';

const routes = Router();
const tasksController = new TasksController();

routes.get('/tasks', auth, tasksController.getTasks)
routes.get('/tasks/:id', auth, tasksController.getTaskId)
routes.post('/tasks', auth, tasksController.saveTask)
routes.put('/tasks/:id', auth, tasksController.updateTask)
routes.patch('/tasks/:id', auth, tasksController.finishedTask)
routes.delete('/tasks/:id', auth, tasksController.removeTask)

export default routes;

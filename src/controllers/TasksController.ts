import { getRepository } from 'typeorm';
import Tasks from '../models/Tasks';
import { Request, Response } from 'express';

class TasksController {
  public async getTasks(req: Request, res: Response): Promise<Response> {
    const tasks = await getRepository(Tasks).find()
    return res.json(tasks)
  }

  public async getTaskId(req: Request, res: Response): Promise<Response> {
    const task = await getRepository(Tasks).findOne(req.params.id)
    return res.json(task)
  }

  public async saveTask(req: Request, res: Response): Promise<Response> {
    const task = await getRepository(Tasks).save(req.body)
    return res.json(task)
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    const task = await getRepository(Tasks).update(req.params.id, req.body)

    if (task.affected > 0) {
      const taskUpdate = await getRepository(Tasks).findOne(req.params.id)
      return res.json(taskUpdate)
    }

    return res.status(404).json({ message: 'Task not found!' })
  }

  public async finishedTask(req: Request, res: Response): Promise<Response> {
    const task = await getRepository(Tasks).update(req.params.id, {
      finished: true
    })

    if (task.affected > 0) {
      return res.json({ message: 'Task finished!' });
    }

    return res.status(404).json({ message: 'Task not found!' })
  }

  public async removeTask(req: Request, res: Response): Promise<Response> {
    const task = await getRepository(Tasks).delete(req.params.id)

    if (task.affected > 0) {
      return res.json({ message: 'Task deleted!' })
    }

    return res.status(404).json({ message: 'Task not found!' })
  }
}

export default TasksController;
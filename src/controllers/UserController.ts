import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import User from '../models/User';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

class UserController {
  public async saveUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const passwordHash = await bcrypt.hash(req.body.password, 8)

    if (!name || !email || !password) return res.status(422).json({ message: "Favor preencha todos os campos de cadastro." })

    const user = await getRepository(User).save({ name, email, password: passwordHash })

    return res.json(user)
  }

  public async listUser(req: Request, res: Response): Promise<Response> {
    const users = await getRepository(User).find()

    return res.json(users)
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    if (!email || !password) return res.status(422).json({ message: "Favor preencha todos os campos de cadastro." })

    const user = await getRepository(User).find({ where: { email } })

    if (user.length === 1) {
      if (await bcrypt.compare(password, user[0].password)) {
        const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET, {
          expiresIn: '1d'
        })

        const data = {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          token
        }

        return res.json(data)
      } else {
        return res.status(404).json({ message: 'User not found' })
      }
    } else {
      return res.status(404).json({ message: 'User not found' })
    }
  }
}

export default UserController;
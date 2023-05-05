import { type NextFunction, type Request, type Response } from 'express'

import { createUser, login } from '../services/auth.service'

const auth = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createUser(req.body)

      res.status(201).json({
        message: 'Success create data',
        status: 201,
        data: { ...user }
      })
    } catch (error) {
      next(error)
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await login(req.body)
      res.json({ data: { ...user } })
    } catch (error) {
      next(error)
    }
  }
}

export default auth

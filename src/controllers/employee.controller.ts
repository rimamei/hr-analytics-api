import { type NextFunction, type Request, type Response } from 'express'

import { type CustomRequest } from '@/middlewares/auth.middleware'
import {
  createEmployee,
  deleteEmployee,
  getDetailEmployee,
  getEmployee,
  updateEmployee
} from '@/services/employee.service'

const employee = {
  getEmployee: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getEmployee()

      res.json({ message: 'Success get all employees', status: 200, data })
    } catch (error) {
      next(error)
    }
  },
  getDetailEmployee: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id)

      const data = await getDetailEmployee(id)

      res.json({ message: 'Success get detail employee', status: 200, data })
    } catch (error) {
      next(error)
    }
  },
  createEmployee: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = (req as CustomRequest).token

      await createEmployee({ ...req.body, email })

      res.json({ message: 'Success create employee', status: 201 })
    } catch (error) {
      next(error)
    }
  },
  updateEmployee: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = (req as CustomRequest).token

      const id = parseInt(req.params.id)

      await updateEmployee({ ...req.body, email, id })

      res.json({ message: 'Success update employee', status: 200 })
    } catch (error) {
      next(error)
    }
  },
  deleteEmployee: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id)
      await deleteEmployee(id)

      res.json({ message: 'Success delete employee', status: 200 })
    } catch (error) {
      next(error)
    }
  }
}

export default employee

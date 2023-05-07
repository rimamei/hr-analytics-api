import { type NextFunction, type Request, type Response } from 'express'

import { type CustomRequest } from '@/middlewares/auth.middleware'
import {
  createDepartment,
  deleteDepartment,
  getDepartment,
  getDetailDepartment,
  updateDepartment
} from '@/services/department.service'

const department = {
  getDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getDepartment()

      res.json({ message: 'Success get all department', status: 200, data })
    } catch (error) {
      next(error)
    }
  },
  detailDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const userId = parseInt(id)

      const data = await getDetailDepartment({ id: userId })

      res.json({ message: 'Success get detail department', status: 200, data })
    } catch (error) {
      next(error)
    }
  },
  createDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = (req as CustomRequest).token
      const { departmentName } = req.body

      const data = await createDepartment({ email, departmentName })

      res.status(201).json({ message: 'Success create department', status: 201, data })
    } catch (error) {
      next(error)
    }
  },
  deleteDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = (req as CustomRequest).token
      const { id } = req.params
      const userId: number = parseInt(id)

      const data = await deleteDepartment({ email, id: userId })

      res.status(200).json({ message: 'Success delete department', status: 200, data })
    } catch (error) {
      next(error)
    }
  },
  updateDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('test', (req as CustomRequest).token)
      const { email } = (req as CustomRequest).token
      const { id } = req.params

      const { departmentName } = req.body
      const departmentId: number = parseInt(id)

      const data = await updateDepartment({ departmentName, id: departmentId, email })

      res.status(200).json({ message: 'Success delete department', status: 200, data })
    } catch (error) {
      next(error)
    }
  }
}

export default department

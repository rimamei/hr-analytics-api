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
      const { orderBy, limit, page } = req.query as any

      const limitParsing = limit ? parseInt(limit) : 0
      const pageParsing = page ? parseInt(page) : 0

      const data = await getDepartment(orderBy, limitParsing, pageParsing)

      res.json({ message: 'Success get all department', status: 200, data })
    } catch (error) {
      next(error)
    }
  },
  detailDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      const userId = parseInt(id)

      const data = await getDetailDepartment(userId)

      res.json({ message: 'Success get detail department', status: 200, data })
    } catch (error) {
      next(error)
    }
  },
  createDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = (req as CustomRequest).token
      const { departmentName } = req.body

      await createDepartment(email, departmentName)

      res.status(201).json({ message: 'Success create department', status: 201 })
    } catch (error) {
      next(error)
    }
  },
  deleteDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = (req as CustomRequest).token
      const { id } = req.params
      const userId: number = parseInt(id)

      await deleteDepartment(email, userId)

      res.status(200).json({ message: 'Success delete department', status: 200 })
    } catch (error) {
      next(error)
    }
  },
  updateDepartment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = (req as CustomRequest).token
      const { id } = req.params

      const { departmentName } = req.body
      const departmentId: number = parseInt(id)

      await updateDepartment(departmentId, departmentName, email)

      res.status(200).json({ message: 'Success delete department', status: 200 })
    } catch (error) {
      next(error)
    }
  }
}

export default department

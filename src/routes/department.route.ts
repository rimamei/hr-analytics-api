import { Router } from 'express'

import {
  createDepartmentSchema,
  detailDepartmentSchema,
  getAllSchema,
  updateDepartmentSchema
} from '@/constants/schema'
import department from '@/controllers/department.controller'
import { verifyToken } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validator'

const router = Router()

router.get('/departments', verifyToken, validate(getAllSchema), department.getDepartment)
router.get('/department/:id', verifyToken, validate(detailDepartmentSchema), department.detailDepartment)
router.post('/department', verifyToken, validate(createDepartmentSchema), department.createDepartment)
router.delete('/department/:id', verifyToken, validate(detailDepartmentSchema), department.deleteDepartment)
router.put('/department/:id', verifyToken, validate(updateDepartmentSchema), department.updateDepartment)

export default router

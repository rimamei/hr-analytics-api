import { Router } from 'express'

import { createEmployeeSchema, detailEmployeeSchema, updateEmployeeSchema } from '@/constants/schema'
import employee from '@/controllers/employee.controller'
import { verifyToken } from '@/middlewares/auth.middleware'
import { validate } from '@/middlewares/validator'

const router = Router()

router.get('/employees', verifyToken, employee.getEmployee)
router.get('/employee/:id', verifyToken, validate(detailEmployeeSchema), employee.getDetailEmployee)
router.post('/employee', verifyToken, validate(createEmployeeSchema), employee.createEmployee)
router.put('/employee/:id', verifyToken, validate(updateEmployeeSchema), employee.updateEmployee)
router.delete('/employee/:id', verifyToken, validate(detailEmployeeSchema), employee.deleteEmployee)

export default router

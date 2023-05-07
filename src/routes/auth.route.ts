import { Router } from 'express'

import { loginSchema, registerSchema } from '@/constants/schema'
import auth from '@/controllers/auth.controller'
import { validate } from '@/middlewares/validator'

const router = Router()

router.post('/register', validate(registerSchema), auth.register)
router.post('/login', validate(loginSchema), auth.login)

export default router

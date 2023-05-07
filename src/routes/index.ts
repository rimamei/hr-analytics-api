import { Router } from 'express'

import auth from './auth.route'
import department from './department.route'

const api = Router().use('/auth', auth).use(department)

export default Router().use('/v1', api)

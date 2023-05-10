import { Router } from 'express'

import auth from './auth.route'
import department from './department.route'
import employee from './employee.route'

const api = Router().use('/auth', auth).use(department).use(employee)

export default Router().use('/api/v1', api)

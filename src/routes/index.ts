import { Router } from 'express'

import auth from './auth.route'

const api = Router().use('/auth', auth)

export default Router().use('/v1', api)

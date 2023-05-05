import jwt from 'jsonwebtoken'

import { User } from '@/constants/types'

export const generateToken = (user: Partial<User>): string => {
  return jwt.sign(user, process.env.JWT_SECRET ?? 'superSecret', {
    expiresIn: '1d'
  })
}

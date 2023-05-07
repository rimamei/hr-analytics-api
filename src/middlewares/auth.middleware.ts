import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'

import HttpException from '@/constants/http-exception'

export interface CustomRequest extends Request {
  token: any | JwtPayload
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new HttpException(401, {
        errors: { message: 'Token needed' }
      })
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET ?? 'superSecret', function (err, user) {
        if (err != null) {
          if (err.message === 'jwt expired') {
            throw new HttpException(401, {
              errors: { message: 'Token expired' }
            })
          } else {
            throw new HttpException(401, {
              errors: { message: 'invalid token' }
            })
          }
        }

        ;(req as CustomRequest).token = user
        next()
      })
    }
  } catch (error) {
    throw new HttpException(401, {
      errors: { message: 'Token needed' }
    })
  }
}

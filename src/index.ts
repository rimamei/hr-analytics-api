/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'

import HttpException from './constants/http-exception'
import routes from './routes'
dotenv.config()

const app = express()

app.use(express.json())
app.use(routes)

app.use((err: HttpException | Error, req: Request, res: Response, next: NextFunction) => {
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({
      status: 'error',
      message: 'Missing authorization credentials'
    })
    // @ts-ignore
  } else if (err && err?.errorCode) {
    // @ts-ignore
    res.status(err.errorCode).json(err.message)
  } else if (err) {
    res.status(500).json(err.message)
  }
})

const PORT = process.env.PORT ?? 3001
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`))

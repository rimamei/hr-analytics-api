import { NextFunction, Request, Response } from 'express'
import { ObjectSchema, ValidationError } from 'yup'

import {
  CreateDepartmentSchemaType,
  CreateEmployeeSchemaType,
  DetailDepartmentSchemaType,
  DetailEmployeeSchemaType,
  GetAllSchemaType,
  LoginSchemaType,
  RegisterSchemaType,
  UpdateDepartmentSchemaType,
  UpdateEmployeeSchemaType
} from '@/constants/schema'

export const validate =
  (
    schema: ObjectSchema<
      | RegisterSchemaType
      | LoginSchemaType
      | DetailDepartmentSchemaType
      | CreateDepartmentSchemaType
      | UpdateDepartmentSchemaType
      | CreateEmployeeSchemaType
      | UpdateEmployeeSchemaType
      | DetailEmployeeSchemaType
      | GetAllSchemaType
    >
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const resource = { body: req.body, query: req.query, params: req.params }
    try {
      await schema.validate(resource)
      next()
    } catch (err) {
      const error = err as ValidationError
      res.status(400).json({ error: error.errors.join(', ') })
    }
  }

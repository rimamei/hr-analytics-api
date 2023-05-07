import * as yup from 'yup'

export const registerSchema = yup.object({
  body: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required')
  })
})

export type RegisterSchemaType = yup.InferType<typeof registerSchema>

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup.string().required('Password is required')
  })
})

export type LoginSchemaType = yup.InferType<typeof loginSchema>

export const detailDepartmentSchema = yup.object({
  params: yup.object({
    id: yup.string().required('Department id is required')
  })
})

export type DetailDepartmentSchemaType = yup.InferType<typeof detailDepartmentSchema>

export const createDepartmentSchema = yup.object({
  body: yup.object({
    departmentName: yup.string().required('Department Name is required')
  })
})

export type CreateDepartmentSchemaType = yup.InferType<typeof createDepartmentSchema>

export const updateDepartmentSchema = yup.object({
  params: yup.object({
    id: yup.string().required('params id is required')
  }),
  body: yup.object({
    departmentName: yup.string().required('Department Name is required')
  })
})

export type UpdateDepartmentSchemaType = yup.InferType<typeof updateDepartmentSchema>

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
  query: yup.object({
    orderBy: yup.string().oneOf(['asc', 'desc']).notRequired(),
    page: yup.number().notRequired(),
    limit: yup.number().notRequired(),
    departmentName: yup.string().required('Department Name is required')
  }),
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

export const createEmployeeSchema = yup.object({
  body: yup.object({
    employeeName: yup.string().required('Employee Name is required'),
    employeeSalary: yup.number().required('Salary is required'),
    employeeBirth: yup.date().required('Date of birth is required'),
    startAt: yup.date().required('Start date is required'),
    departmentId: yup.string().required('Department is required'),
    skill: yup.string().required('Skill is required'),
    status: yup.string().required('Status is required')
  })
})

export type CreateEmployeeSchemaType = yup.InferType<typeof createEmployeeSchema>

export const updateEmployeeSchema = yup.object({
  body: yup.object({
    employeeName: yup.string().required('Employee Name is required'),
    employeeSalary: yup.number().required('Salary is required'),
    employeeBirth: yup.date().required('Date of birth is required'),
    startAt: yup.date().required('Start date is required'),
    endAt: yup.date().notRequired(),
    departmentId: yup.string().required('Department is required'),
    skill: yup.string().required('Skill is required'),
    status: yup.string().required('Status is required')
  })
})

export type UpdateEmployeeSchemaType = yup.InferType<typeof updateEmployeeSchema>

export const detailEmployeeSchema = yup.object({
  params: yup.object({
    id: yup.string().required('Employee id is required')
  })
})

export type DetailEmployeeSchemaType = yup.InferType<typeof detailEmployeeSchema>

export interface Employee {
  employeeName: string
  employeeBirth: Date
  employeeSalary: number
  skill: string
  status: string
  startAt: Date
  endAt?: Date
}

export interface Recruitment {
  position: string
  description: string
  startDate: Date
  endDate: Date
}

export interface Department {
  departmentName: string
}

export interface User {
  id: number
  username: string
  email: string
  password: string
  employees: Employee[]
  recruitment: Recruitment[]
  departments: Department[]
}

export interface RegisteredUser {
  email: string
  username: string
  name: string
  token: string
}

export interface RegisterInput {
  email: string
  username: string
  password: string
  name: string
}

export interface CreateEmployeeType {
  employeeName: string
  employeeBirth: string
  employeeSalary: number
  departmentId: number
  skill: string
  status: string
  startAt: Date
  email: string
}

export interface UpdateEmployeeType extends CreateEmployeeType {
  endAt: Date
  id: number
}

export interface IMeta {
  page: number
  limit: number
  orderBy: 'asc' | 'desc'
}

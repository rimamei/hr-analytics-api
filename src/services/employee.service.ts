import HttpException from '@/constants/http-exception'
import { CreateEmployeeType, UpdateEmployeeType } from '@/constants/types'
import prisma from '@/prisma/prisma-client'

export const getEmployee = async (orderBy: 'asc' | 'desc', limit: number, page: number) => {
  const skip = (page - 1) * limit

  const data = await prisma.employee.findMany({
    skip,
    take: limit,
    orderBy: {
      employeeName: orderBy ?? 'desc'
    },
    select: {
      id: true,
      employeeName: true,
      employeeBirth: true,
      employeeSalary: true,
      departmentName: true,
      departmentId: true,
      skill: true,
      status: true,
      startAt: true,
      endAt: true,
      createdAt: true
    }
  })

  const totalData = await prisma.employee.count()
  const totalPage = Math.ceil(totalData / limit)

  const allData = {
    data,
    meta: {
      page: page - 0,
      totalData,
      totalDataOnPage: data.length ?? 0,
      totalPage
    }
  }

  return allData
}

export const getDetailEmployee = async (id: number) => {
  const data = await prisma.employee.findUnique({
    where: { id }
  })

  if (!data) {
    throw new HttpException(404, { errors: { message: 'Data is not found' } })
  }

  return data
}

export const createEmployee = async (payload: CreateEmployeeType) => {
  const { employeeName, employeeBirth, employeeSalary, startAt, departmentId, skill, status, email } = payload

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })

  const department = await prisma.department.findUnique({ where: { id: departmentId }, select: { id: true } })

  if (!user) {
    throw new HttpException(404, { errors: { message: 'User is not found' } })
  }

  if (!department) {
    throw new HttpException(404, { errors: { message: 'Department is not found' } })
  }

  const data = await prisma.employee.create({
    data: {
      employeeName,
      employeeSalary,
      employeeBirth,
      startAt,
      departmentId,
      skill,
      status,
      createdById: user.id
    },
    select: { id: true }
  })

  if (!data) {
    throw new HttpException(404, { errors: { message: 'Failed to create employee' } })
  }

  return data
}

export const updateEmployee = async (payload: UpdateEmployeeType) => {
  const { employeeName, employeeBirth, employeeSalary, startAt, departmentId, skill, status, email, id, endAt } =
    payload

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })

  const department = await prisma.department.findUnique({ where: { id: departmentId }, select: { id: true } })

  if (!user) {
    throw new HttpException(404, { errors: { message: 'User is not found' } })
  }

  if (!department) {
    throw new HttpException(404, { errors: { message: 'Department is not found' } })
  }

  const data = await prisma.employee.update({
    where: { id },
    data: {
      employeeName,
      employeeSalary,
      employeeBirth,
      startAt,
      endAt: endAt ?? null,
      departmentId,
      skill,
      status,
      createdById: user.id
    },
    select: { id: true }
  })

  if (!data) {
    throw new HttpException(404, { errors: { message: 'Failed to update employee' } })
  }

  return data
}

export const deleteEmployee = async (id: number) => {
  const data = await prisma.employee.findUnique({
    where: { id }
  })

  if (!data) {
    throw new HttpException(404, { errors: { message: 'Data is not found' } })
  }

  const deleteData = await prisma.employee.delete({
    where: { id }
  })

  return deleteData
}

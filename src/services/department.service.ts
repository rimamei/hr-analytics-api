import HttpException from '@/constants/http-exception'
import prisma from '@/prisma/prisma-client'

export const getDepartment = async () => {
  const data = await prisma.department.findMany()

  return data
}

export const getDetailDepartment = async (payload: { id: number }) => {
  const { id } = payload

  const data = await prisma.department.findUnique({
    where: { id },
    select: {
      departmentName: true,
      id: true
    }
  })

  if (!data) {
    throw new HttpException(404, {
      errors: { message: 'Department is not found' }
    })
  }

  return data
}

export const createDepartment = async (payload: { email: string; departmentName: string }) => {
  const { email, departmentName } = payload
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  })

  if (!user) {
    throw new HttpException(404, {
      errors: { message: 'User not found' }
    })
  }

  const existingDepartment = await prisma.department.findUnique({
    where: {
      departmentName
    },
    select: {
      id: true
    }
  })

  if (existingDepartment) {
    throw new HttpException(422, {
      errors: { message: 'Department Name has already been used' }
    })
  }

  const data = await prisma.department.create({
    data: { departmentName, createdById: user.id },
    select: {
      id: true,
      departmentName: true
    }
  })

  return data
}

export const deleteDepartment = async (payload: { email: string; id: number }) => {
  const { id } = payload

  const existingDepartment = await prisma.department.findUnique({
    where: {
      id
    },
    select: {
      id: true
    }
  })

  if (!existingDepartment) {
    throw new HttpException(422, {
      errors: { message: 'Department Name is not found' }
    })
  }

  const data = await prisma.department.delete({
    where: { id }
  })

  return data
}

export const updateDepartment = async (payload: { departmentName: string; id: number; email: string }) => {
  const { id, departmentName, email } = payload

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  })

  if (!existingUser) {
    throw new HttpException(422, {
      errors: { message: 'User is not found' }
    })
  }

  const existingDepartment = await prisma.department.findUnique({
    where: {
      departmentName
    },
    select: {
      id: true
    }
  })

  if (existingDepartment) {
    throw new HttpException(422, {
      errors: { message: 'Department Name had been added' }
    })
  }

  const data = await prisma.department.update({
    where: { id },
    data: { departmentName, createdById: existingUser.id },
    select: { id: true, departmentName: true }
  })

  return data
}

import HttpException from '@/constants/http-exception'
import prisma from '@/prisma/prisma-client'

export const getDepartment = async (orderBy: 'asc' | 'desc', limit: number, page: number) => {
  const skip = (page - 1) * limit

  const data = await prisma.department.findMany({
    skip,
    take: limit,
    orderBy: {
      departmentName: orderBy ?? 'desc'
    },
    select: { departmentName: true, id: true }
  })

  const totalData = await prisma.department.count()
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

export const getDetailDepartment = async (id: number) => {
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

export const createDepartment = async (email: string, departmentName: string) => {
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

export const deleteDepartment = async (email: string, id: number) => {
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

export const updateDepartment = async (id: number, departmentName: string, email: string) => {
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

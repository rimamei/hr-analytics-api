import bcrypt from 'bcryptjs'

import HttpException from '@/constants/http-exception'
import { RegisteredUser, RegisterInput } from '@/constants/types'

import { generateToken } from '@/utils/token.utils'

import prisma from '@/prisma/prisma-client'

import { findExisting } from './department.service'

const checkUserUniqueness = async (email: string, username: string) => {
  const existingUserByEmail = await prisma.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  })

  const existingUserByUsername = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      id: true
    }
  })

  if (existingUserByEmail != null || existingUserByUsername != null) {
    throw new HttpException(422, {
      errors: {
        message: `${existingUserByEmail != null ? 'Email' : 'Username'} has already been taken`
      }
    })
  }
}

export const createUser = async (input: RegisterInput): Promise<RegisteredUser> => {
  const email = input.email?.trim()
  const username = input.username?.trim()
  const password = input.password?.trim()
  const name = input.name?.trim()

  await checkUserUniqueness(email, username)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      name,
      password: hashedPassword
    },
    select: {
      username: true,
      email: true,
      name: true
    }
  })

  return {
    ...user,
    token: generateToken(user)
  }
}

export const login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload

  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, username: true, name: true, password: true }
  })

  if (user != null) {
    const match = await bcrypt.compare(password, user.password)

    if (match) {
      return {
        email: user.email,
        name: user.name,
        username: user.username,
        token: generateToken(user)
      }
    }

    throw new HttpException(403, {
      errors: { message: 'Email or password is invalid' }
    })
  }
}

export const getDetailDepartment = async (payload: { id: number }) => {
  const { id } = payload

  if (id) {
    throw new HttpException(422, {
      errors: { message: "departmentId can't be blank" }
    })
  }

  await findExisting(id)

  const data = await prisma.department.findUnique({
    where: { id },
    select: {
      departmentName: true,
      id: true
    }
  })

  return data
}

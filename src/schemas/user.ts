import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const user = Type.Object({
  lastName: Type.String(),
  name: Type.String()
})

type User = Static<typeof user>

const userCredentials = Type.Object({
  email: Type.String(),
  password: Type.String()
})

type UserCredentials = Static<typeof userCredentials>

const userDto = Type.Object({
  id: Type.Optional(id),
  lastName: Type.String(),
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
})

type UserDTO = Static<typeof userDto>

const storeUserSchema = Type.Object({
  args: user
})

type StoreUser = Static<typeof storeUserSchema>

const loginUserSchema = Type.Object({
  args: userCredentials
})

type LoginUser = Static<typeof loginUserSchema>

export { userDto, UserDTO, user, User, storeUserSchema, StoreUser, userCredentials, UserCredentials, loginUserSchema, LoginUser }

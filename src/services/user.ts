import httpErrors from 'http-errors'
import bcrypt from 'bcrypt'
import { store, remove, get, update, verifyCredentials} from 'database'
import { UserDTO } from 'schemas'
import { EFU, MFU, GE, errorHandling, UCE } from './utils'

type Process = {
  type: 'store' | 'getAll' | 'deleteAll' | 'getOne' | 'update' | 'delete' | 'login'
}

type Arguments = {
  id?: string
  userDto?: UserDTO
  userDtoWithoutId?: Omit<UserDTO, 'id'>
  userCredentials?: Pick<UserDTO, 'email' | 'password'>
}

class UserService {
  #args: Arguments

  constructor(args: Arguments = {}) {
    this.#args = args
  }

  public process({ type }: Process): Promise<string | UserDTO | UserDTO[] | object> {
    switch (type) {
      case 'store':
        return this.#store()
      case 'getAll':
        return this.#getAll()
      case 'deleteAll':
        return this.#deleteAll()
      case 'getOne':
        return this.#getOne()
      case 'update':
        return this.#update()
      case 'delete':
        return this.#delete()
      case 'login':
        return this.#login()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #store(): Promise<UserDTO> {
    try {
      if (!this.#args.userDtoWithoutId)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)
      
      const hashedPW = await bcrypt.hash(this.#args.userDtoWithoutId.password, 10)

      this.#args.userDtoWithoutId = {
        ...this.#args.userDtoWithoutId, 
        password: hashedPW
      }

      const result = await store({
        ...this.#args.userDtoWithoutId
      })

      return result
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #getAll(): Promise<UserDTO[]> {
    try {
      const users = (await get()) as UserDTO[]

      return users
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #deleteAll(): Promise<string> {
    try {
      const usersDeleted = (await remove()) as number

      if (usersDeleted >= 1) return MFU.ALL_USERS_DELETED

      if (usersDeleted === 0)
        throw new httpErrors.Conflict(EFU.NOTHING_TO_DELETE)

      throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #getOne(): Promise<UserDTO> {
    try {
      if (!this.#args.id)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

      const { id } = this.#args
      const user = (await get(id)) as UserDTO | null

      if (!user) throw new httpErrors.NotFound(EFU.NOT_FOUND)

      return user
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #update(): Promise<UserDTO> {
    try {
      if (!this.#args.userDto || !this.#args.userDto.id)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

      const updatedUser = await update(this.#args.userDto)

      if (!updatedUser) throw new httpErrors.NotFound(EFU.NOT_FOUND)

      return updatedUser
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #delete(): Promise<string> {
    try {
      if (!this.#args.id)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

      const { id } = this.#args
      const deletedUser = await remove(id)

      if (!deletedUser) throw new httpErrors.NotFound(EFU.NOT_FOUND)

      return MFU.USER_DELETED
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #login(): Promise<object | string > {
    try {
      if (!this.#args.userCredentials)
        throw new httpErrors.UnprocessableEntity(GE.INTERNAL_SERVER_ERROR)

      const { email, password } = this.#args.userCredentials

      if(email === '' && password === '')
        throw new httpErrors.UnprocessableEntity(UCE.CREDENTIALS_NOT_SENT)

      if(email === '')
        throw new httpErrors.UnprocessableEntity(UCE.EMAIL_MISSING)

      if(password === '')
        throw new httpErrors.UnprocessableEntity(UCE.PASSWORD_MISSING)
      
      const user = await verifyCredentials(email) as UserDTO || null

      if ( !user ) 
        throw new httpErrors.UnprocessableEntity(UCE.EMAIL_UNREGISTERED)

      const pwVerification = await bcrypt.compare(password, user.password)

      if ( !pwVerification )
        throw new httpErrors.UnprocessableEntity(UCE.WRONG_PW)

      const newUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        faculty: user.faculty,
        career: user.career,
        courses: user.courses
      }

      return newUser

    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}

export { UserService }

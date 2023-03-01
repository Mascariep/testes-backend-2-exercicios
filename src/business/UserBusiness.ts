import { UserDatabase } from "../database/UserDatabase"
import {
  DeleteUserInputDTO,
  DeleteUserOutputDTO,
  GetAllOutputDTO,
  GetUserInputDTO,
  LoginInputDTO,
  LoginOutputDTO,
  SignupInputDTO,
  SignupOutputDTO,
} from "../dtos/userDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdManager } from "../services/IdManager"
import { TokenManager } from "../services/TokenManager"
import { TokenPayload, UserDB, USER_ROLES } from "../interface/types"

export class UserBusiness {
  constructor(
    private database: UserDatabase,
    private idManager: IdManager,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input

    if (typeof name !== "string") {
      throw new BadRequestError("NAME MUST BE STRING")
    }

    if (typeof email !== "string") {
      throw new BadRequestError("EMAIL MUST BE STRING")
    }

    if (typeof password !== "string") {
      throw new BadRequestError("PASSWORD MUST BE STRING")
    }

    const emailAlreadyExists = await this.database.findEmail(email)

    if (emailAlreadyExists) {
      throw new BadRequestError("EMAIL ALREADY REGISTERED")
    }

    const id = this.idManager.generate()
    const hashedPassword = await this.hashManager.hash(password)
    const role = USER_ROLES.NORMAL
    const createdAt = new Date().toISOString()

    const newUser = new User(id, name, email, hashedPassword, role, createdAt)

    const userDB = newUser.toDBModel()

    await this.database.insert(userDB)

    const payload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    }

    const token = this.tokenManager.createToken(payload)

    const output: SignupOutputDTO = {
      token,
    }

    return output
  }

  login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input

    if (typeof email !== "string") {
      throw new BadRequestError("EMAIL MUST BE STRING")
    }

    if (typeof password !== "string") {
      throw new BadRequestError("PASSWORD MUST BE STRING")
    }

    const userDB: UserDB | undefined = await this.database.findEmail(email)

    if (!userDB) {
      throw new NotFoundError("EMAIL NOT REGISTERED")
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    )

    const hashedPassword = user.getPassword()

    const isPasswordCorrect = await this.hashManager.compare(
      password,
      hashedPassword
    )

    if (!isPasswordCorrect) {
      throw new BadRequestError("INVALID PASSWORD")
    }

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
    }

    const token = this.tokenManager.createToken(payload)

    const output: LoginOutputDTO = {
      token,
    }

    return output
  }

  getUser = async (input: GetUserInputDTO) => {
    const { token, id } = input

    const payload = this.tokenManager.getPayload(token as string)

    if (!payload || payload.role !== USER_ROLES.ADMIN) {
      throw new UnauthorizedError("INVALID CREDENTIALS")
    }

    if (!id) {
      throw new BadRequestError("ID IS NECESSARY")
    }

    const userDB = (await this.database.getUser(id as string)) as UserDB
    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    )

    const output = user.toBusinessModel()
    return output
  }

  getAllUser = async (): Promise<GetAllOutputDTO> => {
    const usersDB = (await this.database.getUser()) as UserDB[]

    const output = usersDB.map((element) => {
      const user = new User(
        element.id,
        element.name,
        element.email,
        element.password,
        element.role,
        element.created_at
      )

      return user.toBusinessModel()
    })

    return output
  }

  public deleteUser = async (input: DeleteUserInputDTO) => {
    const { token, id } = input

    const payload = this.tokenManager.getPayload(token as string)

    if (!payload || payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("TOKEN IS NECESSARY")
    }

    if (!id) {
      throw new BadRequestError("ID IS NECESSARY")
    }

    const userExist = await this.database.getUser(id as string)

    if (!userExist) {
      throw new Error("USER DELETED")
    }

    await this.database.deleteUser(id as string)

    const output: DeleteUserOutputDTO = {
      message: "USER DELETED SUCCESSFULLY",
    }
    return output
  }
}

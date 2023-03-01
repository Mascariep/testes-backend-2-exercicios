import { UserModel } from "../interface/types"

export interface SignupInputDTO {
  name: unknown
  email: unknown
  password: unknown
}

export interface SignupOutputDTO {
  token: string
}

export interface LoginInputDTO {
  email: unknown
  password: unknown
}

export interface LoginOutputDTO {
  token: string
}

export interface DeleteUserInputDTO {
  token: unknown
  id: unknown
}

export interface DeleteUserOutputDTO {
  message: string
}

export interface GetUserInputDTO {
  token: unknown
  id: unknown
}

export type GetAllOutputDTO = UserModel[]

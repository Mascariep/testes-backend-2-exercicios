import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import {
  DeleteUserInputDTO,
  GetUserInputDTO,
  LoginInputDTO,
  SignupInputDTO,
  SignupOutputDTO,
} from "../dtos/userDTO"
import { BaseError } from "../errors/BaseError"

export class UserController {
  constructor(private business: UserBusiness) {}

  signup = async (req: Request, res: Response) => {
    try {
      const input: SignupInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }

      const output = await this.business.signup(input)

      res.status(201).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const input: LoginInputDTO = {
        email: req.body.email,
        password: req.body.password,
      }

      const output = await this.business.login(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  getAllUser = async (req: Request, res: Response) => {
    try {
      const output = await this.business.getAllUser()
      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  getUser = async (req: Request, res: Response) => {
    try {
      const input: GetUserInputDTO = {
        token: req.headers.authorization,
        id: req.params.id,
      }
      const output = await this.business.getUser(input)
      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    try {
      const input: DeleteUserInputDTO = {
        token: req.headers.authorization,
        id: req.params.id,
      }

      const output = await this.business.deleteUser(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}

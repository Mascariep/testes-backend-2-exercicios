import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { HashManager } from "../services/HashManager"
import { IdManager } from "../services/IdManager"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController(
  new UserBusiness(
    new UserDatabase(),
    new IdManager(),
    new TokenManager(),
    new HashManager()
  )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
userRouter.get("/:id", userController.getUser)
userRouter.get("/", userController.getAllUser)
userRouter.delete("/:id", userController.deleteUser)

import { UserBusiness } from "../../src/business/UserBusiness"
import { GetUserInputDTO } from "../../src/dtos/userDTO"
import { USER_ROLES } from "../../src/interface/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("Deve retornar um Usuário em f(id)", async () => {
    const input: GetUserInputDTO = {
      id: "id-mock",
      token: "token-mock-admin",
    }

    const response = await userBusiness.getUser(input)
    expect(response).toEqual({
      id: "id-mock",
      name: "Normal Mock",
      email: "normal@email.com",
      password: "hash-bananinha",
      createdAt: expect.any(String),
      role: USER_ROLES.NORMAL,
    })
  })
})

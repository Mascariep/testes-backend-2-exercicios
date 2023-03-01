import { UserBusiness } from "../../src/business/UserBusiness"
import { USER_ROLES } from "../../src/interface/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("getAllUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("Deve retornar uma lista de Usuários", async () => {
    const response = await userBusiness.getAllUser()
    expect(response).toHaveLength(2)
    expect(response).toContainEqual({
      id: "id-mock",
      name: "Normal Mock",
      email: "normal@email.com",
      password: "hash-bananinha",
      createdAt: expect.any(String), // valor dinâmico (pode ser qualquer string)
      role: USER_ROLES.NORMAL,
    })
  })
})

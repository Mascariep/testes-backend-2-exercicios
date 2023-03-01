import { UserBusiness } from "../../src/business/UserBusiness"
import { DeleteUserInputDTO } from "../../src/dtos/userDTO"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("deleteUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("Deve deletar um usuário em f(id)", async () => {
    const input: DeleteUserInputDTO = {
      id: "id-mock",
      token: "token-mock-admin",
    }

    const response = await userBusiness.deleteUser(input)
    // expect(response.message).toBe("USER DELETED SUCCESSFULLY")
    expect(response).toEqual({ message: "USER DELETED SUCCESSFULLY" })
  })
})

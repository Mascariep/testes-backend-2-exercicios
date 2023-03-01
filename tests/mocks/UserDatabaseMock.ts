import { BaseDatabase } from "../../src/database/BaseDatabase"
import { UserDB, USER_ROLES } from "../../src/interface/types"

export class UserDatabaseMock extends BaseDatabase {
  static TABLE_USERS = "users"

  insert = async (userDB: UserDB): Promise<void> => {
    // não precisa retornar nada, porque é void
  }

  findEmail = async (email: string): Promise<UserDB | undefined> => {
    switch (email) {
      case "normal@email.com":
        return {
          id: "id-mock",
          name: "Normal Mock",
          email: "normal@email.com",
          password: "hash-bananinha",
          created_at: new Date().toISOString(),
          role: USER_ROLES.NORMAL,
        }
      case "admin@email.com":
        return {
          id: "id-mock",
          name: "Admin Mock",
          email: "admin@email.com",
          password: "hash-bananinha",
          created_at: new Date().toISOString(),
          role: USER_ROLES.ADMIN,
        }
      default:
        return undefined
    }
  }

  getUser = async (
    id?: string | undefined
  ): Promise<UserDB | UserDB[] | undefined> => {
    if (id === "id-mock") {
      return {
        id: "id-mock",
        name: "Normal Mock",
        email: "normal@email.com",
        password: "hash-bananinha",
        created_at: new Date().toISOString(),
        role: USER_ROLES.NORMAL,
      }
    }
    return [
      {
        id: "id-mock",
        name: "Normal Mock",
        email: "normal@email.com",
        password: "hash-bananinha",
        created_at: new Date().toISOString(),
        role: USER_ROLES.NORMAL,
      },
      {
        id: "id-mock",
        name: "Admin Mock",
        email: "admin@email.com",
        password: "hash-bananinha",
        created_at: new Date().toISOString(),
        role: USER_ROLES.ADMIN,
      },
    ]
  }

  deleteUser = async (id: string): Promise<void> => {}
}

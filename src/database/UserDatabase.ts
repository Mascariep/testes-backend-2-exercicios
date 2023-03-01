import { UserDB } from "../interface/types"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
  static TABLE_USERS = "users"

  insert = async (userDB: UserDB): Promise<void> => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB)
  }

  findEmail = async (email: string): Promise<UserDB | undefined> => {
    const result: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where({ email })

    return result[0]
  }

  getUser = async (
    id?: string | undefined
  ): Promise<UserDB | UserDB[] | undefined> => {
    if (id) {
      const result: UserDB[] = await BaseDatabase.connection(
        UserDatabase.TABLE_USERS
      )
        .select()
        .where({ id })
      return result[0]
    }

    const result: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).select()

    return result
  }

  deleteUser = async (id: string) => {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id })
  }
}

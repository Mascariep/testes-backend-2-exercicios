import { UserDB, UserModel, USER_ROLES } from "../interface/types"

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
    private createdAt: string
  ) {}

  getId(): string {
    return this.id
  }

  setId(value: string): void {
    this.id = value
  }

  getName(): string {
    return this.name
  }

  setName(value: string): void {
    this.name = value
  }

  getEmail(): string {
    return this.email
  }

  setEmail(value: string): void {
    this.email = value
  }

  getPassword(): string {
    return this.password
  }

  setPassword(value: string): void {
    this.password = value
  }

  getRole(): USER_ROLES {
    return this.role
  }

  setRole(value: USER_ROLES): void {
    this.role = value
  }

  getCreatedAt(): string {
    return this.createdAt
  }

  setCreatedAt(value: string): void {
    this.createdAt = value
  }

  toDBModel(): UserDB {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAt,
    }
  }

  toBusinessModel(): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt,
    }
  }
}

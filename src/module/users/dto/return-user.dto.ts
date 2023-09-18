import { type User } from '../schemas/user.schema'

export class ReturnUserDto {
  name: string
  mail: string

  // тут описываешь те поля которые я хочу отдавать в другие сервисы или на фронт
  constructor (user: User) {
    this.name = user.name
    this.mail = user.mail
  }
}

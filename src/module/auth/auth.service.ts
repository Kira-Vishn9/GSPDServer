import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor (private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  async validateUser (username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async getuser (id) {
    return await this.usersService.findById(id)
  }

  async login (user: any) {
    const userDocument = await this.usersService.findOne(user.mail)
    const payload = { username: user.mail, sub: userDocument._id }
    return {
      access_token: this.jwtService.sign(payload),
      id: userDocument._id
    }
  }

  async addNewUser (data) {
    return await this.usersService.create(data)
  }
}

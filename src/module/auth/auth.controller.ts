import { Body, Controller, HttpStatus, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { type Types } from 'mongoose'

class NewUserDto {
  mail: string
  password: string
}

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  async addNewUser (@Body() data: NewUserDto) {
    const response = await this.authService.addNewUser(data)
    return { response, status: HttpStatus.OK }
  }

  @Post('login')
  async logIn (@Body() data: NewUserDto, @Request() req): Promise<{ token: { access_token: string, id: Types.ObjectId }, status: HttpStatus }> {
    const response = await this.authService.login(data)
    return { token: response, status: HttpStatus.OK }
  }
}

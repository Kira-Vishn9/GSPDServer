import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";

class NewUserDto {
    mail: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    addNewUser(@Body() data: NewUserDto) {
        return this.authService.addNewUser(data);
    }

    @Get('login')
    logIn(@Body() data: NewUserDto, @Request() req) {
        return this.authService.login(data)
    }
}

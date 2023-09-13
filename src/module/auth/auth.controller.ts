import {Body, Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";

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

    @UseGuards(JwtAuthGuard)
    @Get('login')
    logIn(@Body() data: NewUserDto, @Request() req) {
        return this.authService.login(data)
    }
}

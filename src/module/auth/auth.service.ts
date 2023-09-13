import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const userDocument = await this.usersService.findOne(user.mail)
        const payload = { username: user.mail, sub: userDocument._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    addNewUser(data) {
        return this.usersService.create(data);
    }

}
import { AuthService } from "./auth.service";
declare class NewUserDto {
    mail: string;
    password: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    addNewUser(data: NewUserDto): Promise<import("../users/dto/return-user.dto").ReturnUserDto>;
    logIn(data: NewUserDto, req: any): Promise<{
        access_token: string;
    }>;
}
export {};

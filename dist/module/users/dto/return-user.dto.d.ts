import { User } from "../schemas/user.schema";
export declare class ReturnUserDto {
    name: string;
    mail: string;
    constructor(user: User);
}

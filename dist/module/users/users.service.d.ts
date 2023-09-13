import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { ReturnUserDto } from "./dto/return-user.dto";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<ReturnUserDto>;
    findAll(): Promise<User[]>;
    findOne(username: string): Promise<UserDocument | undefined>;
}

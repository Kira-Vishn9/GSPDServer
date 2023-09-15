import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {ReturnUserDto} from "./dto/return-user.dto";


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
        const createdUser = new this.userModel(createUserDto);
        const createdDoc = await createdUser.save();
        return new ReturnUserDto(createdDoc)
    }
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(username: string): Promise<UserDocument | undefined> {
        return  this.userModel.findOne({mail: username});
    }

    async  findById(id: string): Promise<UserDocument> {
          return await this.userModel.findById(id)
    }

    async editUserList(userId, listName, action, ids) {
        const user = await this.findById(userId)

        const listForEditing = user[listName]

        user[listName] = action === 'push'
            ? [...listForEditing, ...ids]
            : listForEditing.filter(item => !ids.includes(item.id))

        await user.save()
    }

    async deletPostId(id: string, postId: string) {
        try {
            const user = await this.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            const postIndex = user.posts.findIndex((p) => p.toString() === postId);

            if (postIndex === -1) {
                throw new Error('Post not found in user.posts');
            }
            user.posts.splice(postIndex, 1);
            await user.save();

            return { message: 'Post removed successfully' };
        } catch (error) {
            throw new Error(error.message);
        }
    }

}
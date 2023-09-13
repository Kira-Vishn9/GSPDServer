import {Controller, Get, Request} from '@nestjs/common';
import {PostsService} from "../posts/posts.service";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private postsService: PostsService,
                private usersService: UsersService) {}

    @Get('/posts')
    async getAllUserPosts(@Request() req) {
       const postsId = await this.usersService.findById(req.user.userId).then((data) => {return data.posts})
        return await this.postsService.getMyPosts(postsId)
    }
}

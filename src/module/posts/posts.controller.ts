import {Body, Controller, Get, Post, UseGuards, Query, Request, Param} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "../users/users.service";



@Controller('post')
export class PostsController {
    constructor(private postService: PostsService,
                private usersService: UsersService) {}
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createNewPost(@Request() req,@Body() data: CreatePostDto) {
        const newPost= await this.postService.create(data)
        const userId = req.user.userId;
        await this.usersService.editUserList(userId, 'posts', 'push', [newPost['_id']] )
        return newPost
    }

    @Get()
    async getPosts(
        @Query('page') page: number = 1,
        @Query('perPage') perPage: number = 25,
    ) {
        const skip = (page - 1) * perPage;
        return await this.postService.getPaginatedPosts(skip, perPage);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':postId/like')
    async addNewLike(@Request() req, @Param('postId') postId: string) {
        const userId = req.user.userId;
        try {
            return await this.postService.targetLike(userId, postId);
        } catch (error) {
            return { message: error.message };
        }
    }
}

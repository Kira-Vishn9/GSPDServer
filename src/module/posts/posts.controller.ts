import {Body, Controller, Get, Post, UseGuards, Query, Request, Param} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";



@Controller('post')
export class PostsController {
    constructor(private postService: PostsService) {}
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createNewPost(@Body() data: CreatePostDto) {
        return this.postService.create(data)
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
        console.log(req.user)
        console.log(postId)
        const userId = req.user.userId;
        try {
            return await this.postService.targetLike(userId, postId);
        } catch (error) {
            return { message: error.message };
        }
    }
}

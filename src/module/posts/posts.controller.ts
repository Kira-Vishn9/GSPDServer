import {Body, Controller, Get, Post, UseGuards, Query, Request, Param, Delete} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "../users/users.service";
import {CommentsService} from "../comments/comments.service";
import {CreateCommentDto} from "../comments/dto/create-comment.dto";



@Controller('post')
export class PostsController {
    constructor(private postService: PostsService,
                private usersService: UsersService,
                private commentsService: CommentsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createNewPost(@Request() req, @Body() data: CreatePostDto) {
        const newPost= await this.postService.create(data)
        const userId = req.user.userId;
        await this.usersService.editUserList(userId, 'posts', 'push', [newPost['_id']] )
        return newPost
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':postId')
    async deletePost(@Request() req, @Param('postId') postId: string){
        const user = await this.usersService.findById(req.user.userId)
        const postsId = user.posts.map(id => id.toString())
        if (postsId.includes(postId)){
            await this.postService.deletePost(postId)
            return await this.usersService.deletPostId(req.user.userId, postId)
        }
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

    @UseGuards(JwtAuthGuard)
    @Post(':postId/rating')
    async addRating(@Request() req, @Body() body, @Param('postId') postId: string) {
        const userId = req.user.userId;
        try {
            return await this.postService.targetRating(userId, postId, body.grade);
        } catch (error) {
            return { message: error.message };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getAllUserPosts(@Request() req) {
        const postsId = await this.usersService.findById(req.user.userId).then((data) => {return data.posts})
        return await this.postService.getMyPosts(postsId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile/sort:date')
    async getMySortPostsUpDate(@Request() req, @Param("date") date) {
        const postsId = await this.usersService.findById(req.user.userId).then((data) => {return data.posts})
        return await this.postService.getMySortPostsDate(postsId, date)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile/filter/:type')
    async getMyFilterPostsType(@Request() req, @Param("type") type) {
        const postsId = await this.usersService.findById(req.user.userId).then((data) => {return data.posts})
        return await this.postService.getMyFilterPostsType(postsId, type)
    }

    @UseGuards(JwtAuthGuard)
    @Get('popular')
    async getTheMostPopularPost(){
        return this.postService.getTheMostPopularPost()
    }
    @UseGuards(JwtAuthGuard)
    @Post(':postId/comment')
    async createNewComment(@Request() req, @Body() data: CreateCommentDto, @Param('postId') postId) {
        data.authorId = req.user.userId
        const newComment = await this.commentsService.create(data);
        return await this.postService.addNewComment(postId, [newComment['_id']]);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':postId/update')
    async updatePost(@Request() req, @Body() data: CreatePostDto, @Param('postId') postId) {
        try {
            const user = await this.usersService.findById(req.user.userId);
            const postsId = user.posts.map(id => id.toString());

            if (postsId.includes(postId)) {
                return await this.postService.updatePost(postId, data);

            } else {
                return { message: 'Post not found in user posts' };
            }
        } catch (error) {
            return { message: error.message };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':postId')
    async getPost(@Param("postId") postId){
        const post = await this.postService.getPost(postId);
        const comments = await this.commentsService.getPaginatedCommentForPost(post.comments, 1, 10)
        return {post: post, comments: comments}
    }
}

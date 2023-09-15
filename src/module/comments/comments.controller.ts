import {Body, Controller, Param, Post, Request, UseGuards} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {PostsService} from "../posts/posts.service";


@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService,
                private postsService: PostsService) {}
    @UseGuards(JwtAuthGuard)
    @Post('create/:postId')
    async createNewPost(@Request() req, @Body() data: CreateCommentDto, @Param('postId') postId) {
        data.authorId = req.user.userId
        const newComment = await this.commentsService.create(data);
        return await this.postsService.addNewCommet(postId, [newComment['_id']]);
    }

}

import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) {}
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createNewPost(@Body() data: CreateCommentDto) {

        return this.commentsService.create(data)
    }

}

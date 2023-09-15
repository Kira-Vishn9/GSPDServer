import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Comment, CommentSchema} from "./schema /comment.schema";
import { CommentsController } from './comments.controller';
import {PostsModule} from "../posts/posts.module";


@Module({
  imports: [ PostsModule ,MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
  providers: [CommentsService],
  exports: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}

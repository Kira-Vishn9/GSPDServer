import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schemas/post.schema";
import {PostsController} from "./posts.controller";


@Module({
  imports: [ MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],

})
export class PostsModule {}

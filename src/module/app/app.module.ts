import { Module } from '@nestjs/common';
import { AuthModule } from "../auth/auth.module";
import { MongooseModule } from '@nestjs/mongoose';
import {AuthController} from "../auth/auth.controller";
import {PostsController} from "../posts/posts.controller";
import {CommentsModule} from "../comments/comments.module";
import {CommentsController} from "../comments/comments.controller";
import {UsersModule} from "../users/users.module";
import {PostsModule} from "../posts/posts.module";
import {UsersController} from "../users/users.controller";

@Module({
  imports: [
      PostsModule, UsersModule, CommentsModule ,AuthModule, MongooseModule.forRoot('mongodb+srv://KiraAdmin:ytekjdbvsq1@cluster0.s75kmmu.mongodb.net/?retryWrites=true&w=majority')
  ],
  controllers: [AuthController, PostsController, CommentsController, UsersController],
  providers: [],
})
export class AppModule {}

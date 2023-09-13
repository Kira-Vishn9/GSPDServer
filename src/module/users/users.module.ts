import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import {PostsModule} from "../posts/posts.module";


@Module({
  imports: [ PostsModule ,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

// import {Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
// import {AuthService} from "../auth/auth.service";
// import {LocalAuthGuard} from "../auth/local-auth.guard";
// import {JwtAuthGuard} from "../auth/jwt-auth.guard";
// import {PostsService} from "../posts/posts.service";
// import {CommentsService} from "../comments/comments.service";
// import {AuthController} from "../auth/auth.controller";
//
//
// @Controller()
// export class AppController {
//     constructor(private authService: AuthService,
//                 private  postsService: PostsService,
//                 private  commentsService: CommentsService,
//                 private authController: AuthController
//                 ) {}
//
//     // @UseGuards(JwtAuthGuard)
//     // @Post('auth/login')
//     // async login(@Request() req) {
//     //     console.log(req)
//     //     return this.authService.login(req.user);
//     // }
//     // @UseGuards(JwtAuthGuard)
//     // @Get('profile')
//     // getProfile(@Request() req) {
//     //     return req.user;
//     // }
//
// }
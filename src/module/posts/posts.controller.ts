import {Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards} from '@nestjs/common'
import {CreatePostDto} from './dto/create-post.dto'
import {PostsService} from './posts.service'
import {JwtAuthGuard} from '../auth/jwt-auth.guard'
import {UsersService} from '../users/users.service'
import {CommentsService} from '../comments/comments.service'
import {CreateCommentDto} from '../comments/dto/create-comment.dto'

@Controller('post')
export class PostsController {
  constructor (
    private readonly postService: PostsService,
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createNewPost (@Request() req, @Body() data) {
    const userId = req.headers.userid
    const newPost = await this.postService.create(data)
    await this.usersService.editUserList(userId, 'posts', 'push', [newPost._id])
    return newPost
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async deletePost (@Request() req, @Param('postId') postId: string) {
    const user = await this.usersService.findById(req.headers.userid)
    const postsId = user.posts.map(id => id.toString())
    if (postsId.includes(postId)) {
      await this.postService.deletePost(postId)
      return await this.usersService.deletPostId(req.user.userId, postId)
    }
  }

  @Get()
  async getPosts (
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 25
  ) {
    const skip = (page - 1) * perPage
    return await this.postService.getPaginatedPosts(skip, perPage)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/like')
  async addNewLike (@Request() req, @Param('postId') postId: string) {
    const userId = req.headers.userid
    try {
      return await this.postService.targetLike(userId, postId)
    } catch (error) {
      return { message: error.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/like/check')
  async checkLike (@Request() req, @Param('postId') postId: string) {
    const userId = req.headers.userid
    try {
      return await this.postService.checkLike(userId, postId)
    } catch (error) {
      return { message: error.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/rating')
  async addRating (@Request() req, @Body() body, @Param('postId') postId: string) {
    const userId = req.headers.userid
    try {
      return await this.postService.targetRating(userId, postId, body.grade)
    } catch (error) {
      return { message: error.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postId/rating/check/:id')
  async checkRating (@Request() req, @Param('postId') postId: string, @Param('id') userId) {
    // const userId = req.headers.userid
    try {
      return await this.postService.checkRating(userId, postId)
    } catch (error) {
      return { message: error.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:userId')
  async getAllUserPosts (@Request() req, @Param('userId') userId: string) {
    const postsId = await this.usersService.findById(userId).then((data) => { return data.posts })
    return await this.postService.getMyPosts(postsId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/sort:date')
  async getMySortPostsUpDate (@Request() req, @Param('date') date) {
    const postsId = await this.usersService.findById(req.headers.userid).then((data) => { return data.posts })
    return await this.postService.getMySortPostsDate(postsId, date)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/filter/:type')
  async getMyFilterPostsType (@Request() req, @Param('type') type) {
    const postsId = await this.usersService.findById(req.headers.userid).then((data) => { return data.posts })
    return await this.postService.getMyFilterPostsType(postsId, type)
  }

  @Get('popular')
  async getTheMostPopularPost () {
    return await this.postService.getTheMostPopularPost()
  }

  @Get('popular/:type')
  async getTheMostPopular (@Param('type') type, @Query('count') count) {
    return await this.postService.getPopular(type, count)
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/comment')
  async createNewComment (@Request() req, @Body() data: CreateCommentDto, @Param('postId') postId) {
    data.authorId = req.headers.userid
    const newComment = await this.commentsService.create(data)
    return await this.postService.addNewComment(postId, [newComment._id])
  }

  @UseGuards(JwtAuthGuard)
  @Post(':postId/update')
  async updatePost (@Request() req, @Body() data: CreatePostDto, @Param('postId') postId) {
    try {
      const user = await this.usersService.findById(req.headers.userid)
      const postsId = user.posts.map(id => id.toString())

      if (postsId.includes(postId)) {
        return await this.postService.updatePost(postId, data)
      } else {
        return { message: 'Post not found in user posts' }
      }
    } catch (error) {
      return { message: error.message }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':postId')
  async getPost (@Param('postId') postId, @Request() req,@Query('page') page) {
    const post = await this.postService.getPost(postId)
    const comments = await this.commentsService.getPaginatedCommentForPost(post.comments, page, 5)
    return { post, comments }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/special/:type')
  async getSpecialPost (@Request() req, @Param('type') type,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 5) {
    const res = await this.postService.getSpecialPost(type, page, perPage)

    return res
  }
}

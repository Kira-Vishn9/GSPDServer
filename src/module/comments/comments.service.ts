import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { type CreateCommentDto } from './dto/create-comment.dto'
import { Comment } from './schema /comment.schema'

@Injectable()
export class CommentsService {
  constructor (@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}

  async create (createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto)
    return await createdComment.save()
  }

  async getPaginatedCommentForPost (ids: string[], page: number = 1, perPage: number = 3) {
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const allComments = await this.commentModel.find({ _id: { $in: ids } })
    return allComments.slice(startIndex, endIndex)
  }
}

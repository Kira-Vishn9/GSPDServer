import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { type CreateCommentDto } from './dto/create-comment.dto'
import { Comment, type CommentDocument } from './schema /comment.schema'

@Injectable()
export class CommentsService {
  constructor (@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}

  async create (createCommentDto: CreateCommentDto): Promise<CommentDocument> {
    const createdComment = new this.commentModel(createCommentDto)
    return await createdComment.save()
  }

  async getPaginatedCommentForPost (ids: string[], page, perPage: number = 5) {
    const startIndex = (0)
    const endIndex = page * perPage
    const allComments = await this.commentModel.find({ _id: { $in: ids } })
    return allComments.reverse().slice(startIndex, endIndex)
  }
}

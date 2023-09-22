import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, type UserDocument } from './schemas/user.schema'
import { type CreateUserDto } from './dto/create-user.dto'
import { ReturnUserDto } from './dto/return-user.dto'

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) {}

  async create (createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const createdUser = new this.UserModel(createUserDto)
    const createdDoc = await createdUser.save()
    return new ReturnUserDto(createdDoc)
  }

  async findOne (username: string): Promise<UserDocument | undefined> {
    return await this.UserModel.findOne({ mail: username })
  }

  async findById (id: string): Promise<UserDocument> {
    return await this.UserModel.findById(id)
  }

  async editUserList (userId, listName, action, ids) {
    const user = await this.UserModel.findById(userId)
    const listForEditing = user[listName]
    user[listName] = action === 'push'
      ? [...listForEditing, ...ids]
      : listForEditing.filter(item => !ids.includes(item.id))

    await user.save()
  }

  async deletPostId (id: string, postId: string) {
    try {
      const user = await this.findById(id)
      if (!user) {
        throw new Error('User not found')
      }
      const postIndex = user.posts.findIndex((p) => p.toString() === postId)

      if (postIndex === -1) {
        throw new Error('Post not found in user.posts')
      }
      user.posts.splice(postIndex, 1)
      await user.save()

      return { message: 'Post removed successfully' }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

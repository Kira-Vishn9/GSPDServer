import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type Document } from 'mongoose'

export type PostDocument = Post & Document

@Schema({ timestamps: true })
export class Post {
  @Prop()
    title: string

  @Prop()
    titlePost: string

  @Prop()
    img: string

  @Prop({ index: true })
    type: string

  @Prop()
    author: string

  @Prop()
    ratingAuthor: number

  @Prop({ default: 0 })
    totalRating: number

  @Prop({ type: Map, of: Number, default: {} })
    rating: Map<string, number>

  @Prop()
    like: string[]

  @Prop()
    comments: string[]

  @Prop()
    text: string
}

export const PostSchema = SchemaFactory.createForClass(Post)

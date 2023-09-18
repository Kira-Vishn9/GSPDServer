import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { type HydratedDocument, type ObjectId } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ default: null })
    name: string

  @Prop()
    mail: string

  @Prop()
    password: string

  @Prop()
    posts: ObjectId[]

  @Prop({ default: 'light' })
    mode: string

  @Prop({ default: 'en' })
    lan: string
}

export const UserSchema = SchemaFactory.createForClass(User)

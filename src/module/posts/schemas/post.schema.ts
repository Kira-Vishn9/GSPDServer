import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
    @Prop()
    title: string;

    @Prop()
    titlePost: string;

    @Prop()
    img: string;

    @Prop({index: true})
    type: string;

    @Prop()
    author: string;

    @Prop()
    rating: number;

    @Prop()
    like: string[];

    @Prop()
    comments: string[];

}

export const PostSchema = SchemaFactory.createForClass(Post);
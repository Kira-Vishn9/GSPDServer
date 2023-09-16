// schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
    @Prop()
    title: string;

    @Prop()
    titlePost: string;

    @Prop()
    img: string;

    @Prop({ index: true })
    type: string;

    @Prop()
    author: string;

    @Prop()
    ratingAuthor: number;

    @Prop()
    totalRating: number;

    @Prop({ type: Map, of: Number, default: {} })
    rating: Map<string, number>;

    @Prop()
    like: string[];

    @Prop()
    comments: string[];
}


export const PostSchema = SchemaFactory.createForClass(Post);
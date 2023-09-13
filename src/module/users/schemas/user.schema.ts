import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({default: null})
    name: string;

    @Prop()
    mail: string;

    @Prop()
    password: string;

    @Prop()
    posts : [];
}


export const UserSchema = SchemaFactory.createForClass(User);
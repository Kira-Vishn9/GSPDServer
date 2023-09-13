import { Model } from "mongoose";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./schema /comment.schema";
export declare class CommentsService {
    private commentModel;
    constructor(commentModel: Model<Comment>);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
}

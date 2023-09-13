import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
export declare class CommentsController {
    private commentsService;
    constructor(commentsService: CommentsService);
    createNewPost(data: CreateCommentDto): Promise<import("./schema /comment.schema").Comment>;
}

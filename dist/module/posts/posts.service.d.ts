/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { Post } from "./schemas/post.schema";
import { CreatePostDto } from "./dto/create-post.dto";
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<Post>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    getPaginatedPosts(skip: number, perPage: number): Promise<(import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getPost(id: number): Promise<import("mongoose").Document<unknown, {}, Post> & Post & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    targetLike(userId: string, postId: string): Promise<any>;
}

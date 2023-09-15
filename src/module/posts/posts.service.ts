import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Post} from "./schemas/post.schema";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async create(data: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(data);
        return createdPost.save();
    }

    async getPaginatedPosts(skip: number, perPage: number) {
        return await this.postModel
            .find()
            .skip(skip)
            .limit(perPage)
            .exec();
    }

    async getPost(id: number) {
        return await this.postModel.findById(id)
    }

    async targetLike(userId: string, postId: string): Promise<any> {
        try {
            const post = await this.postModel.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            const userIndex = post.like.indexOf(userId);
            if (userIndex === -1) {
                post.like.push(userId);
            } else {
                post.like.splice(userIndex, 1);
            }
            await post.save();
            return { message: 'Like operation successful', post };
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getMyPosts(ids: ObjectId[]) {
        return this.postModel.find({ _id: { $in: ids } });
    }

    async addNewCommet (idPost, idComment) {
        const post = await this.postModel.findById(idPost)
        post.comments.push(idComment[0])
        return await post.save()
    }

    async deletePost (id){
        return this.postModel.deleteOne({_id: id})
    }

    async updatePost(postId: string, data: CreatePostDto): Promise<any> {
        try {
            const post = await this.postModel.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }

            post.title = data.title;
            post.titlePost =data.titlePost;
            post.img = data.img;
            post.type = data.type;
            post.author = data.author;
            post.rating = data.rating;

            await post.save();

            return { message: 'Post updated successfully', post };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
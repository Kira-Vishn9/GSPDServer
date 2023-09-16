import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Post} from "./schemas/post.schema";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async create(data: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel({
            ...data,
            rating: new Map<string, number>()});
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

    async updateTotalRating(postId: string): Promise<void> {
        const post = await this.postModel.findById(postId);
        if (!post) {
            throw new Error('Post not found');
        }

        let totalRating = 0;
        let totalRatingCount = 0;
        for (const grade of post.rating.values()) {
            totalRating += grade;
            totalRatingCount++
        }

        post.totalRating = totalRating / totalRatingCount;
        await post.save();
    }

    async targetRating(userId: string, postId: string, grade: number): Promise<any> {
        try {
            const post = await this.postModel.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }

            post.rating.set(userId, grade);

            await post.save();

            await this.updateTotalRating(postId);

            return await this.postModel.findById(postId)
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getMyPosts(ids: ObjectId[]) {
        return this.postModel.find({ _id: { $in: ids } });
    }

    async getMySortPostsDate(ids: ObjectId[], date) {
        const allPosts = await this.postModel.find({ _id: { $in: ids } });
        if(date === ':up'){
        return allPosts.sort((a, b) => a.get('createdAt') - b.get('createdAt'));
        }else{
            return allPosts.sort((a, b) => b.get('createdAt') - a.get('createdAt') );
        }
    }

    async getMyFilterPostsType(ids: ObjectId[], type: string) {
        const allPosts = await this.postModel.find({ _id: { $in: ids } });
        return allPosts.filter(post => post.type === type);
    }

    async addNewComment (idPost, idComment) {
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
            post.ratingAuthor = data.ratingAuthor;

            await post.save();

            return { message: 'Post updated successfully', post };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
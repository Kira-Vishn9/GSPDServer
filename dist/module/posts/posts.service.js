"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schemas/post.schema");
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async create(createPostDto) {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }
    async getPaginatedPosts(skip, perPage) {
        return await this.postModel
            .find()
            .skip(skip)
            .limit(perPage)
            .exec();
    }
    async getPost(id) {
        return await this.postModel.findById(id);
    }
    async targetLike(userId, postId) {
        try {
            const post = await this.postModel.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            const userIndex = post.like.indexOf(userId);
            if (userIndex === -1) {
                post.like.push(userId);
            }
            else {
                post.like.splice(userIndex, 1);
            }
            await post.save();
            return { message: 'Like operation successful', post };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getMyPosts(ids) {
        return this.postModel.find(ids);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map
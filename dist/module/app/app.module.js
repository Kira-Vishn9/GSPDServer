"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const auth_controller_1 = require("../auth/auth.controller");
const posts_controller_1 = require("../posts/posts.controller");
const comments_module_1 = require("../comments/comments.module");
const comments_controller_1 = require("../comments/comments.controller");
const users_module_1 = require("../users/users.module");
const posts_module_1 = require("../posts/posts.module");
const users_controller_1 = require("../users/users.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            posts_module_1.PostsModule, users_module_1.UsersModule, comments_module_1.CommentsModule, auth_module_1.AuthModule, mongoose_1.MongooseModule.forRoot('mongodb+srv://KiraAdmin:ytekjdbvsq1@cluster0.s75kmmu.mongodb.net/?retryWrites=true&w=majority')
        ],
        controllers: [auth_controller_1.AuthController, posts_controller_1.PostsController, comments_controller_1.CommentsController, users_controller_1.UsersController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
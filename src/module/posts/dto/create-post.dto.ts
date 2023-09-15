export interface CreatePostDto {
    title: string;
    titlePost: string;
    img: string;
    type: string;
    author: string;
    rating: number;
    like: string[];
    comments: string[];
}
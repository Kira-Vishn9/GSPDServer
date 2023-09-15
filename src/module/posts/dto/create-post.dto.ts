export interface CreatePostDto {
    title: string;
    img: string;
    type: string;
    author: string;
    rating: number;
    like: string[];
    comments: string[];
}
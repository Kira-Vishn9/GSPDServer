export interface CreatePostDto {
    title: string;
    titlePost: string;
    img: string;
    type: string;
    author: string;
    ratingAuthor: number;
    totalRating: number;
    rating: Map<string, number>;
    like: string[];
    comments: string[];
}
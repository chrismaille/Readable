import { IPost } from "../PostsAPI";

export const GET_POSTS = "GET_POSTS";

export interface IPostAction {
  type: string;
  posts: IPost[];
}

export const getPosts = (posts: IPost[]): IPostAction => {
  return {
    posts,
    type: GET_POSTS
  };
};

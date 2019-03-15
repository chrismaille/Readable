import { Post } from "../PostsAPI";

export const GET_POSTS = "GET_POSTS";

export interface PostsAction {
  type: string;
  posts: Post[];
}

export const getPosts = (posts: Post[]): PostsAction => {
  return {
    posts,
    type: GET_POSTS
  };
};

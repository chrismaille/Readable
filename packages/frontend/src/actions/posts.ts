import { Post } from "../PostsAPI";
import { PostsAction } from "./shared";

export const GET_POSTS = "GET_POSTS";

export const getPosts = (posts: Post[]): PostsAction => {
  return {
    posts,
    type: GET_POSTS
  };
};

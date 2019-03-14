import { combineReducers } from "redux";
import { Category, Post, PostComment } from "../PostsAPI";
import { categories } from "./categories";
import { comments } from "./comments";
import { posts } from "./posts";
import { loading } from "./shared";

export interface ReduxStore {
  categories: Category[];
  comments: PostComment[];
  loading: boolean;
  posts: Post[];
}

export const reducer = combineReducers({
  categories,
  comments,
  loading,
  posts
});

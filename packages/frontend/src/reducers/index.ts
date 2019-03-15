import { combineReducers } from "redux";
import { SortOptions } from "../actions/shared";
import { Category, Post, PostComment } from "../PostsAPI";
import { categories } from "./categories";
import { comments } from "./comments";
import { posts } from "./posts";
import { loading, sort } from "./shared";

export interface ReduxStore {
  categories: Category[];
  comments: PostComment[];
  loading: boolean;
  posts: Post[];
  sort: SortOptions;
}

export const reducer = combineReducers({
  categories,
  comments,
  loading,
  posts,
  sort
});

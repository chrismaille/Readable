import { combineReducers } from "redux";
import { ISortValue } from "../actions/sorts";
import { ICategory, IPost, IPostComment } from "../PostsAPI";
import { categories, selectedCategory } from "./categories";
import { comments } from "./comments";
import { posts } from "./posts";
import { loading, sort } from "./shared";

export interface IReduxStore {
  categories: ICategory[];
  comments: IPostComment[];
  loading: boolean;
  posts: IPost[];
  sort: ISortValue;
  selectedCategory: ICategory | null;
}

export const reducer = combineReducers({
  categories,
  comments,
  loading,
  posts,
  selectedCategory,
  sort
});

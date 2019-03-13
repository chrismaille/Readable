import { api, Category, Post, PostComment } from "../PostsAPI";
import { getCategories } from "./categories";
import { getPosts } from "./posts";

export interface PostsAction { type: string; posts: Post[] }
export interface CommentsAction { type: string; comments: PostComment[] }
export interface CategoriesAction { type: string; categories: Category[] }

export const handleInitialData = () => {
  // @ts-ignore
  return dispatch => {
    return api.getInitialData().then(({ categories, posts }) => {
      dispatch(getCategories(categories));
      dispatch(getPosts(posts));
    });
  };
};

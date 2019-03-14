import { api, Category, Post, PostComment } from "../PostsAPI";
import { getCategories } from "./categories";
import { getPosts } from "./posts";

export interface PostsAction {
  type: string;
  posts: Post[];
}
export interface CommentsAction {
  type: string;
  comments: PostComment[];
}
export interface CategoriesAction {
  type: string;
  categories: Category[];
}
export interface LoadingAction {
  type: string;
  loading: boolean;
}

export const FINISH_LOADING = "FINISH_LOADING";

export const finishLoading = (loading: boolean): LoadingAction => {
  return {
    loading,
    type: FINISH_LOADING
  };
};

export const handleInitialData = () => {
  // @ts-ignore
  return dispatch => {
    return api.getInitialData().then(({ categories, posts }) => {
      dispatch(getCategories(categories));
      dispatch(getPosts(posts));
    });
  };
};

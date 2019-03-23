import { Dispatch } from "redux";
import { api, InitialData } from "../PostsAPI";
import { getCategories } from "./categories";
import { getComments } from "./comments";
import { getPosts } from "./posts";

export interface ILoadingAction {
  type: string;
  loading: boolean;
}

export const FINISH_LOADING = "FINISH_LOADING";

export const finishLoading = (loading: boolean): ILoadingAction => {
  return {
    loading,
    type: FINISH_LOADING
  };
};

export const handleInitialData = () => {
  return async (dispatch: Dispatch<any>) => {
    const { categories, posts }: InitialData = await api.getInitialData();
    const comments = await api.getAllComments(posts);
    dispatch(getCategories(categories));
    dispatch(getPosts(posts));
    dispatch(getComments(comments));
  };
};

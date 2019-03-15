// @ts-ignore
import { Dispatch } from "redux";
import { api, InitialData } from "../PostsAPI";
import { getCategories } from "./categories";
import { getPosts } from "./posts";

export interface LoadingAction {
  type: string;
  loading: boolean;
}

export type SortOptions = "Vote" | "Date"

export interface SortAction {
  type: string;
  sort: SortOptions
}

export const FINISH_LOADING = "FINISH_LOADING";
export const CHANGE_SORT = "CHANGE_SORT";

export const finishLoading = (loading: boolean): LoadingAction => {
  return {
    loading,
    type: FINISH_LOADING
  };
};

export const changeSort = (sort: SortOptions): SortAction => {
  return {
    sort,
    type: CHANGE_SORT
  }
};

export const handleInitialData = () => {
  return async (dispatch: Dispatch<any>) =>  {
    const { categories, posts }: InitialData = await api.getInitialData();
    dispatch(getCategories(categories));
    dispatch(getPosts(posts));
  };
};

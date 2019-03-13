import { Category } from "../PostsAPI";
import { CategoriesAction } from "./shared";

export const GET_CATEGORIES = "GET_CATEGORIES";

export const getCategories = (categories: Category[]): CategoriesAction => {
  return {
    categories,
    type: GET_CATEGORIES
  };
};

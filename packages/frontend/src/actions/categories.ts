import { Category } from "../PostsAPI";

export const GET_CATEGORIES = "GET_CATEGORIES";

export interface CategoriesAction {
  type: string;
  categories: Category[];
}

export const getCategories = (categories: Category[]): CategoriesAction => {
  return {
    categories,
    type: GET_CATEGORIES
  };
};

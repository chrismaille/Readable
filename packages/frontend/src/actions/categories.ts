import { ICategory } from "../PostsAPI";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const CATEGORY_SELECTED = "CATEGORY_SELECTED";

export interface ICategoryAction {
  type: string;
  categories: ICategory[];
}

export interface ICategorySelectedAction {
  type: string;
  category: ICategory | null;
}

export const getCategories = (categories: ICategory[]): ICategoryAction => {
  return {
    categories,
    type: GET_CATEGORIES
  };
};

export const selectCategory = (
  category: ICategory | null
): ICategorySelectedAction => {
  return {
    category,
    type: CATEGORY_SELECTED
  };
};

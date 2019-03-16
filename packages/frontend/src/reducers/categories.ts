import {
  CATEGORY_SELECTED,
  GET_CATEGORIES,
  ICategoryAction,
  ICategorySelectedAction
} from "../actions/categories";
import { ICategory } from "../PostsAPI";

const categoriesInitialState: ICategory[] = [];
const selectedCategoryInitialState = null;

export const categories = (
  state = categoriesInitialState,
  action: ICategoryAction
) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return [...state, ...action.categories];
    default:
      return state;
  }
};

export const selectedCategory = (
  state: ICategory | null = selectedCategoryInitialState,
  action: ICategorySelectedAction
) => {
  switch (action.type) {
    case CATEGORY_SELECTED:
      return action.category;
    default:
      return state;
  }
};

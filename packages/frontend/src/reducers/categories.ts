import { GET_CATEGORIES } from "../actions/categories";
import { CategoriesAction } from "../actions/shared";
import { Category } from "../PostsAPI";

const initialState: Category[] = [];

export const categories = (state = initialState, action: CategoriesAction) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return [
        ...state,
        ...action.categories
      ];
    default:
      return state;
  }
};

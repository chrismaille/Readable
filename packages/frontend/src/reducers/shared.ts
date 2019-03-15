import { CHANGE_SORT, FINISH_LOADING, LoadingAction, SortAction, SortOptions } from "../actions/shared";

const loadingInitialState: boolean = true;
const changeSortInitialState = 'Vote';

export const loading = (state = loadingInitialState, action: LoadingAction) => {
  switch (action.type) {
    case FINISH_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export const sort = (state: SortOptions = changeSortInitialState, action: SortAction) => {
  switch (action.type) {
    case CHANGE_SORT:
      return action.sort;
    default:
      return state;
  }
};

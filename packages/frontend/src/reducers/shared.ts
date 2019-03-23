import { FINISH_LOADING, ILoadingAction } from "../actions/loading";
import {
  CHANGE_SORT,
  ISortAction,
  ISortValue,
  sortValues
} from "../actions/sorts";

const loadingInitialState: boolean = true;
const changeSortInitialState = sortValues[0];

export const loading = (
  state = loadingInitialState,
  action: ILoadingAction
) => {
  switch (action.type) {
    case FINISH_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export const sort = (
  state: ISortValue = changeSortInitialState,
  action: ISortAction
) => {
  switch (action.type) {
    case CHANGE_SORT:
      return action.sort;
    default:
      return state;
  }
};

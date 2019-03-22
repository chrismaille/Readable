import {
  GET_POST_COMMENTS,
  ICommentAction,
  UPDATE_COMMENT
} from "../actions/comments";
import { IPostComment } from "../PostsAPI";

const initialState: IPostComment[] = [];

export const comments = (state = initialState, action: ICommentAction) => {
  switch (action.type) {
    case GET_POST_COMMENTS:
      // @ts-ignore
      return [...state, ...action.comments];
    case UPDATE_COMMENT:
      return state
        .filter((comment: IPostComment) => comment.id !== action.comment.id)
        .concat(action.comment);
    default:
      return state;
  }
};

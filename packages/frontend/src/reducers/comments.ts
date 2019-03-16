import { GET_POST_COMMENTS, ICommentAction } from "../actions/comments";
import { IPostComment } from "../PostsAPI";

const initialState: IPostComment[] = [];

export const comments = (state = initialState, action: ICommentAction) => {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return [...state, ...action.comments];
    default:
      return state;
  }
};

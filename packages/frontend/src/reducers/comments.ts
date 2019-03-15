import { CommentsAction, GET_POST_COMMENTS } from "../actions/comments";
import { PostComment } from "../PostsAPI";

const initialState: PostComment[] = [];

export const comments = (state = initialState, action: CommentsAction) => {
  switch (action.type) {
    case GET_POST_COMMENTS:
      return [
        ...state,
        ...action.comments
      ];
    default:
      return state;
  }
};

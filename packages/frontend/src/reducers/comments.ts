import {
  ADD_COMMENT,
  DELETE_COMMENT,
  DOWNVOTE_COMMENT,
  GET_POST_COMMENTS,
  ICommentAction,
  UPDATE_COMMENT,
  UPVOTE_COMMENT
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
    case ADD_COMMENT:
      return state.concat(action.comment);
    case DELETE_COMMENT:
      return state.map((comment: IPostComment) => {
        if (comment.id === action.comment.id) {
          comment.deleted = !comment.deleted;
        }
        return comment;
      });
    case UPVOTE_COMMENT:
      return state.map((comment: IPostComment) => {
        if (comment.id === action.comment.id) {
          comment.voteScore += 1;
        }
        return comment;
      });
    case DOWNVOTE_COMMENT:
      return state.map((comment: IPostComment) => {
        if (comment.id === action.comment.id) {
          comment.voteScore -= 1;
        }
        return comment;
      });
    default:
      return state;
  }
};

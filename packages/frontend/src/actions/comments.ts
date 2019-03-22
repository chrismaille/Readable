import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { api, IPostComment } from "../PostsAPI";

export const GET_POST_COMMENTS = "GET_POST_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export interface ICommentAction {
  type: string;
  comment: IPostComment;
}

export const getComments = (comments: IPostComment[]) => {
  return {
    comments,
    type: GET_POST_COMMENTS
  };
};

const updateComment = (comment: IPostComment): ICommentAction => {
  return {
    comment,
    type: UPDATE_COMMENT
  };
};

export const handleUpdateComment = (
  comment: IPostComment,
  oldComment: IPostComment
) => (dispatch: Dispatch<ICommentAction>) => {
  dispatch(updateComment(comment));
  api
    .updateComment(comment.id, comment)
    .then(() => toast("Comment saved."))
    .catch(() => {
      dispatch(updateComment(oldComment));
      toast("An error occurs");
    });
};

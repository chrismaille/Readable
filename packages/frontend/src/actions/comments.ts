import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { api, ICreateComment, IPostComment } from "../PostsAPI";

export const GET_POST_COMMENTS = "GET_POST_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPVOTE_COMMENT = "UPVOTE_COMMENT";
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";

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

const upVoteComment = (comment: IPostComment): ICommentAction => {
  return {
    comment,
    type: UPVOTE_COMMENT
  };
};

const downVoteComment = (comment: IPostComment): ICommentAction => {
  return {
    comment,
    type: DOWNVOTE_COMMENT
  };
};

const deleteComment = (comment: IPostComment): ICommentAction => {
  return {
    comment,
    type: DELETE_COMMENT
  };
};

const addComment = (comment: IPostComment): ICommentAction => {
  return {
    comment,
    type: ADD_COMMENT
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

export const handleUpVoteComment = (comment: IPostComment) => (
  dispatch: Dispatch<any>
) => {
  dispatch(upVoteComment(comment));
  const { id } = comment;
  api.voteComment(id, "upVote").catch(() => {
    toast("An error occurred.");
    dispatch(downVoteComment(comment));
  });
};

export const handleDownVoteComment = (comment: IPostComment) => (
  dispatch: Dispatch<any>
) => {
  dispatch(downVoteComment(comment));
  const { id } = comment;
  api.voteComment(id, "downVote").catch(() => {
    toast("An error occurred.");
    dispatch(upVoteComment(comment));
  });
};

export const handleDeleteComment = (comment: IPostComment) => (
  dispatch: Dispatch<any>
) => {
  dispatch(deleteComment(comment));
  const { id } = comment;
  api
    .deleteComment(id)
    .then(() => toast("Comment deleted."))
    .catch(() => {
      toast("An error occurred.");
      dispatch(deleteComment(comment)); // invert boolean
    });
};

export const handleAddComment = (comment: ICreateComment) => (
  dispatch: Dispatch<any>
) => {
  api
    .createComment(comment)
    .then((newComment: IPostComment) => {
      dispatch(addComment(newComment));
    })
    .catch(() => toast("An error occurred."));
};

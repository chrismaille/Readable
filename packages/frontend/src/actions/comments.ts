import { PostComment } from "../PostsAPI";
import { CommentsAction } from "./shared";

export const GET_POST_COMMENTS = "GET_POST_COMMENTS";

export const getComments = (comments: PostComment[]): CommentsAction => {
  return {
    comments,
    type: GET_POST_COMMENTS
  };
};

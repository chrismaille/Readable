import { PostComment } from "../PostsAPI";

export const GET_POST_COMMENTS = "GET_POST_COMMENTS";

export interface CommentsAction {
  type: string;
  comments: PostComment[];
}

export const getComments = (comments: PostComment[]): CommentsAction => {
  return {
    comments,
    type: GET_POST_COMMENTS
  };
};

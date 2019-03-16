import { IPostComment } from "../PostsAPI";

export const GET_POST_COMMENTS = "GET_POST_COMMENTS";

export interface ICommentAction {
  type: string;
  comments: IPostComment[];
}

export const getComments = (comments: IPostComment[]): ICommentAction => {
  return {
    comments,
    type: GET_POST_COMMENTS
  };
};

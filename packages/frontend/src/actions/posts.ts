import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { api, IPost } from "../PostsAPI";

export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPVOTE_POST = "UPVOTE_POST";
export const DOWNVOTE_POST = "DOWNVOTE_POST_POST";

export interface IPostAction {
  type: string;
  post: IPost;
}

export const getPosts = (posts: IPost[]) => {
  return {
    posts,
    type: GET_POSTS
  };
};

const deletePost = (post: IPost): IPostAction => {
  return {
    post,
    type: DELETE_POST
  };
};

const upVotePost = (post: IPost): IPostAction => {
  return {
    post,
    type: UPVOTE_POST
  };
};

const downVotePost = (post: IPost): IPostAction => {
  return {
    post,
    type: DOWNVOTE_POST
  };
};

export const handleDeletePost = (post: IPost) => (
  dispatch: Dispatch<IPostAction>
) => {
  dispatch(deletePost(post));
  return api
    .deletePost(post.id)
    .then(() => toast("Post deleted."))
    .catch(() => {
      dispatch(deletePost(post));
      toast("An error has occurred.");
    });
};

export const handleUpVotePost = (post: IPost) => (
  dispatch: Dispatch<IPostAction>
) => {
  dispatch(upVotePost(post));
  return api.votePost(post.id, "upVote").catch(() => {
    dispatch(downVotePost(post));
    toast("An error occurred.");
  });
};

export const handleDownVotePost = (post: IPost) => (
  dispatch: Dispatch<IPostAction>
) => {
  dispatch(downVotePost(post));
  return api.votePost(post.id, "downVote").catch(() => {
    dispatch(upVotePost(post));
    toast("An error occurred.");
  });
};

import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { IPostFormState } from "../components/PostForm";
import { api, ICreatePost, IPost, IResponseNewPost } from "../PostsAPI";

export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPVOTE_POST = "UPVOTE_POST";
export const DOWNVOTE_POST = "DOWNVOTE_POST_POST";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const SELECT_POST = "SELECT_POST";

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

export const addPost = (post: IPost): IPostAction => {
  return {
    post,
    type: ADD_POST
  };
};

export const editPost = (post: IPost): IPostAction => {
  return {
    post,
    type: EDIT_POST
  };
};

export const selectPost = (post: IPost): IPostAction => {
  return {
    post,
    type: SELECT_POST
  };
};

export const handleDeletePost = (post: IPost | null) => (
  dispatch: Dispatch<IPostAction>
) => {
  if (!post) {
    return toast("An error occurred: missing post.");
  }
  dispatch(deletePost(post));
  return api
    .deletePost(post.id)
    .then(() => toast("Post deleted."))
    .catch(() => {
      dispatch(deletePost(post));
      toast("An error has occurred.");
    });
};

export const handleUpVotePost = (post: IPost | null) => (
  dispatch: Dispatch<IPostAction>
) => {
  if (!post) {
    return toast("An error occurred: missing post.");
  }
  dispatch(upVotePost(post));
  return api.votePost(post.id, "upVote").catch(() => {
    dispatch(downVotePost(post));
    toast("An error occurred.");
  });
};

export const handleDownVotePost = (post: IPost | null) => (
  dispatch: Dispatch<IPostAction>
) => {
  if (!post) {
    return toast("An error occurred: missing post.");
  }
  dispatch(downVotePost(post));
  return api.votePost(post.id, "downVote").catch(() => {
    dispatch(upVotePost(post));
    toast("An error occurred.");
  });
};

export const handleAddPost = (post: IPostFormState) => (
  dispatch: Dispatch<IPostAction>
) => {
  const newPost: ICreatePost = {
    author: post.username,
    body: post.body,
    // @ts-ignore
    category: post.selectedCategory.value,
    id: Math.random()
      .toString(36)
      .replace(/[^a-z:0-9]+/g, "")
      .substr(0, 20),
    timestamp: Date.now(),
    title: post.title
  };
  return api
    .createPost(newPost)
    .then((response: IResponseNewPost) => {
      return response;
    })
    .catch(() => toast("An error occurred."));
};

export const handleEditPost = (postId: string, post: IPostFormState) => (
  dispatch: Dispatch<IPostAction>
) => {
  const editedPost = {
    author: post.username,
    body: post.body,
    // @ts-ignore
    category: post.selectedCategory.value,
    title: post.title
  };
  return api
    .updatePost(postId, editedPost)
    .then((response: IResponseNewPost) => {
      return response;
    })
    .catch(() => toast("An error occurred."));
};

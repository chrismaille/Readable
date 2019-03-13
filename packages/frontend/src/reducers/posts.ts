import { GET_POSTS } from "../actions/posts";
import { PostsAction } from "../actions/shared";
import { Post } from "../PostsAPI";

const initialState: Post[] = [];

export const posts = (state = initialState, action: PostsAction) => {
  switch (action.type) {
    case GET_POSTS:
      return [...state, ...action.posts];
    default:
      return state;
  }
};

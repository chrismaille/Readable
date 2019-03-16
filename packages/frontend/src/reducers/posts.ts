import { GET_POSTS, IPostAction } from "../actions/posts";
import { IPost } from "../PostsAPI";

const initialState: IPost[] = [];

export const posts = (state = initialState, action: IPostAction) => {
  switch (action.type) {
    case GET_POSTS:
      return [...state, ...action.posts];
    default:
      return state;
  }
};

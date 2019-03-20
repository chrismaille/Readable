import {
  ADD_POST,
  DELETE_POST,
  DOWNVOTE_POST,
  EDIT_POST,
  GET_POSTS,
  IPostAction,
  UPVOTE_POST
} from "../actions/posts";
import { IPost } from "../PostsAPI";

const initialState: IPost[] = [];

export const posts = (state = initialState, action: IPostAction) => {
  switch (action.type) {
    case GET_POSTS:
      // @ts-ignore
      return state.concat(action.posts);
    case DELETE_POST:
      return state.map((post: IPost) => {
        if (post.id === action.post.id) {
          post.deleted = !post.deleted;
        }
        return post;
      });
    case UPVOTE_POST:
      return state.map((post: IPost) => {
        if (post.id === action.post.id) {
          post.voteScore += 1;
        }
        return post;
      });
    case DOWNVOTE_POST:
      return state.map((post: IPost) => {
        if (post.id === action.post.id) {
          post.voteScore -= 1;
        }
        return post;
      });
    case ADD_POST:
      return state.concat(action.post);
    case EDIT_POST:
      return state
        .filter(post => post.id !== action.post.id)
        .concat(action.post);
    default:
      return state;
  }
};

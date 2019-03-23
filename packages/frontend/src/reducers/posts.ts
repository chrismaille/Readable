import {
  ADD_POST,
  DELETE_POST,
  DOWNVOTE_POST,
  EDIT_POST,
  GET_POSTS,
  IPostAction,
  SELECT_POST,
  UPVOTE_POST
} from "../actions/posts";
import { IPost } from "../PostsAPI";

const initialPostsState: IPost[] = [];
const initialSelectedPostState = null;

export const posts = (state = initialPostsState, action: IPostAction) => {
  switch (action.type) {
    case GET_POSTS:
      // @ts-ignore
      return [...state, ...action.posts];
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
      return [...state, action.post];
    case EDIT_POST:
      return state
        .filter(post => post.id !== action.post.id)
        .concat(action.post);
    default:
      return state;
  }
};

export const selectedPost = (
  state: IPost | null = initialSelectedPostState,
  action: IPostAction
) => {
  switch (action.type) {
    case SELECT_POST:
      return action.post;
    default:
      return state;
  }
};

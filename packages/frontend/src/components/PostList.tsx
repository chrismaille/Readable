import * as _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ISortValue } from "../actions/sorts";
import { ICategory, IPost } from "../PostsAPI";
import { IReduxStore } from "../reducers";
import PostLine from "./PostLine";
import PostListTitle from "./PostListTitle";

interface IProps {
  sortedPosts: IPost[];
  dispatch: Dispatch<any>;
  sort: ISortValue;
  selectedCategory: ICategory | null;
}

const PostList = (props: IProps) => {
  return (
    <section className="post-data">
      <PostListTitle />
      {props.sortedPosts.length > 0 ? (
        <table className="post-list-table">
          <tbody>
            <tr className="post-list-line">
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Category</th>
              <th>VoteScore</th>
            </tr>
            {props.sortedPosts.map(post => (
              <PostLine key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={"post-not-found"}>No Posts found.</div>
      )}
    </section>
  );
};

const mapStateToProps = ({ posts, sort, selectedCategory }: IReduxStore) => {
  const sortedPosts: IPost[] = _.sortBy(posts, [
    (post: IPost) => {
      switch (sort.value) {
        case "Date":
          return post.timestamp;
        default:
          return post.voteScore;
      }
    }
  ])
    .reverse()
    .filter(post => {
      if (selectedCategory) {
        if (post.category === selectedCategory.path) return post;
      } else {
        return post;
      }
    });

  return {
    selectedCategory,
    sort,
    sortedPosts
  };
};

export default connect(mapStateToProps)(PostList);

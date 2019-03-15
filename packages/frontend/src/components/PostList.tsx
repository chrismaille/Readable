import * as _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SortOptions } from "../actions/shared";
import { Post } from "../PostsAPI";
import { ReduxStore } from "../reducers";
import PostLine from "./PostLine";

interface Props {
  sortedPosts: Post[];
  dispatch: Dispatch<any>;
  sort: SortOptions
}

const PostList = (props: Props) => (
  <section className="post-data">
    <div className="post-list-header" >Posts by {props.sort}</div>
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
          <PostLine key={post.id} post={post}/>
        ))}
      </tbody>
    </table>
  </section>
);

const mapStateToProps = ({ posts, sort }: ReduxStore) => {
  const sortedPosts: Post[] = _.sortBy(posts, [(post: Post) => {
    switch (sort) {
      case 'Date':
        return post.timestamp;
      default:
        return post.voteScore;
    }
  }]).reverse();
  return {
    sort,
    sortedPosts
  };
};

export default connect(mapStateToProps)(PostList);

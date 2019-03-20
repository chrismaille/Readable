import React from "react";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { IPost } from "../PostsAPI";
import PostMenu from "./PostMenu";

interface IProps extends RouteComponentProps {
  post: IPost;
}

const PostLine = (props: IProps) => {
  const {
    id,
    title,
    author,
    timestamp,
    category,
    voteScore,
    commentCount
  } = props.post;
  return (
    <tr>
      <td>
        <NavLink to={`/${category}/${id}`}>{title}</NavLink>
      </td>
      <td>{author}</td>
      <td>{commentCount}</td>
      <td>{new Date(timestamp).toLocaleDateString()}</td>
      <td>{category}</td>
      <td>{voteScore}</td>
      <td>
        <PostMenu post={props.post} />
      </td>
    </tr>
  );
};

// @ts-ignore
export default withRouter(connect()(PostLine));

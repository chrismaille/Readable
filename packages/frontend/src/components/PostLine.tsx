import React from "react";
import { IPost } from "../PostsAPI";
import PostMenu from "./PostMenu";

interface IProps {
  post: IPost;
}

const PostLine = (props: IProps) => {
  const { title, author, timestamp, category, voteScore, commentCount } = props.post;
  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{commentCount}</td>
      <td>{new Date(timestamp).toLocaleDateString()}</td>
      <td>{category}</td>
      <td>{voteScore}</td>
      <td><PostMenu post={props.post}/></td>
    </tr>
  );
};

export default PostLine;

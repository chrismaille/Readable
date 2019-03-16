import React from "react";
import { IPost } from "../PostsAPI";

interface IProps {
  post: IPost;
}

const PostLine = (props: IProps) => {
  const { title, author, timestamp, category, voteScore } = props.post;
  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{new Date(timestamp).toLocaleDateString()}</td>
      <td>{category}</td>
      <td>{voteScore}</td>
    </tr>
  );
};

export default PostLine;

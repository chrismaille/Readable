import React from "react";
import { Post } from "../PostsAPI";


interface Props {
  post: Post;
}

const PostLine = (props: Props) => {
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

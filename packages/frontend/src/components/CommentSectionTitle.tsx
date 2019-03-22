import * as React from "react";
import { IPostComment } from "../PostsAPI";

const CommentSectionTitle = (props: { comments: IPostComment[] }) => (
  <div className="comments-section-title">
    Comments ({props.comments.length})
  </div>
);

export default CommentSectionTitle;

import * as React from "react";
import { IPostComment } from "../PostsAPI";

interface IProps {
  comments: IPostComment[]
}

const CommentSectionTitle: React.FC<IProps> = (props) => (
  <div className="comments-section-title">
    <span>Comments ({props.comments.length})</span>
    <span className="comments-count">Click on comment to edit.</span>
  </div>
);

export default CommentSectionTitle;

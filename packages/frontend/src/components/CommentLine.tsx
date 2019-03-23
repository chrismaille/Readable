import { EditableText } from "@blueprintjs/core";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { handleUpdateComment } from "../actions/comments";
import { IPostComment } from "../PostsAPI";
import CommentMenu from "./CommentMenu";

interface IProps extends DispatchProp {
  comment: IPostComment;
}

class CommentLine extends React.Component<IProps> {
  public handleUpdateComment = (value: string) => {
    const oldComment = this.props.comment;
    const newComment = this.props.comment;
    if (this.props.comment.body !== value) {
      newComment.body = value;
      // @ts-ignore
      this.props.dispatch(handleUpdateComment(newComment, oldComment));
    }
  };

  public render() {
    const { author, body, timestamp, voteScore } = this.props.comment;
    return (
      <div className={"comment-data"}>
        <div className={"comment-info"}>
          <div>{author}</div>
          <div>{new Date(timestamp).toLocaleDateString()}</div>
          <div>{voteScore}</div>
        </div>
        <EditableText
          className={"comment-body"}
          multiline={true}
          minLines={2}
          maxLines={5}
          defaultValue={body}
          onConfirm={this.handleUpdateComment}
        />
        <CommentMenu comment={this.props.comment} />
      </div>
    );
  }
}
const mapStateToProps = ({}, ownProps: { comment: IPostComment }) => {
  return {
    comment: ownProps.comment
  };
};
export default connect(mapStateToProps)(CommentLine);

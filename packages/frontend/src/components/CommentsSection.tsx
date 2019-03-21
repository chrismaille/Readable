import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IPostComment } from "../PostsAPI";
import { IReduxStore } from "../reducers";
import { IParamProps } from "./Detail";

interface IProps extends DispatchProp, RouteComponentProps<IParamProps> {
  postComments: IPostComment[];
}

class CommentsSection extends React.Component<IProps> {
  public render() {
    const { postComments } = this.props;
    return (
      <div>
        <div className="comments-section-title">
          Comments ({postComments.length})
        </div>
        {postComments.map((comment: IPostComment) => {
          const { author, body, timestamp, voteScore } = comment;
          return (
            <div key={comment.id} className={"comment-data"}>
              <div>{author}</div>
              <div>{body}</div>
              <div>{new Date(timestamp).toLocaleDateString()}</div>
              <div>{voteScore}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ comments, selectedPost }: IReduxStore) => {
  const postComments = selectedPost
    ? comments.filter(
        (comment: IPostComment) =>
          comment.parentId === selectedPost.id && !comment.deleted
      )
    : [];
  return {
    postComments
  };
};

export default withRouter(connect(mapStateToProps)(CommentsSection));

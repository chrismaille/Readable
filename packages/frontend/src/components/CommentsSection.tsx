import _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IPostComment } from "../PostsAPI";
import { IReduxStore } from "../reducers";
import CommentLine from "./CommentLine";
import CommentSectionTitle from "./CommentSectionTitle";
import { IParamProps } from "./Detail";

interface IProps extends DispatchProp, RouteComponentProps<IParamProps> {
  postComments: IPostComment[];
}

class CommentsSection extends React.Component<IProps> {
  public render() {
    const { postComments } = this.props;
    return (
      <div>
        <CommentSectionTitle comments={postComments} />
        {postComments.map((comment: IPostComment) => (
          <CommentLine key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ comments, selectedPost }: IReduxStore) => {
  const postComments = selectedPost
    ? _.sortBy(comments, [(comment: IPostComment) => comment.timestamp])
        .reverse()
        .filter(
          (comment: IPostComment) =>
            comment.parentId === selectedPost.id && !comment.deleted
        )
    : [];
  return {
    postComments
  };
};

export default withRouter(connect(mapStateToProps)(CommentsSection));

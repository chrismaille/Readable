import React, { Component, Fragment } from "react";
import { FaThumbsDown, FaThumbsUp, FaTrashAlt } from "react-icons/fa";
import { connect, DispatchProp } from "react-redux";
import ReactTooltip from "react-tooltip";
import { handleDeleteComment, handleDownVoteComment, handleUpVoteComment } from "../actions/comments";
import { IPostComment } from "../PostsAPI";

interface IProps extends DispatchProp {
  comment: IPostComment;
}

class CommentMenu extends Component<IProps> {
  public handleUpVote = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    this.props.dispatch(handleUpVoteComment(this.props.comment));
  };

  public handleDownVote = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    this.props.dispatch(handleDownVoteComment(this.props.comment));
  };

  public handlePostDelete = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    this.props.dispatch(handleDeleteComment(this.props.comment));
  };

  public render() {
    return (
      <Fragment>
        <ReactTooltip/>
        <div className={"comment-menu"}>
          <FaThumbsUp data-tip={"Vote Up"} onClick={this.handleUpVote}/>
          <FaThumbsDown data-tip={"Vote down"} onClick={this.handleDownVote}/>
          <FaTrashAlt
            data-tip={"Delete Comment"}
            onClick={this.handlePostDelete}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({}, ownProps: { comment: IPostComment }) => {
  return {
    comment: ownProps.comment
  };
};
export default connect(mapStateToProps)(CommentMenu);

import React, { Component, Fragment } from "react";
import {
  FaRegEdit,
  FaThumbsDown,
  FaThumbsUp,
  FaTrashAlt
} from "react-icons/fa";
import { connect, DispatchProp } from "react-redux";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {
  handleDeletePost,
  handleDownVotePost,
  handleUpVotePost
} from "../actions/posts";
import { IPost } from "../PostsAPI";

interface IProps extends DispatchProp {
  post: IPost;
}

class PostMenu extends Component<IProps> {
  private post: IPost = this.props.post;

  public handleUpVote = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    this.props.dispatch(handleUpVotePost(this.post));
  };

  public handleDownVote = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    return this.props.dispatch(handleDownVotePost(this.post));
  };

  public handlePostDelete = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    return this.props.dispatch(handleDeletePost(this.post));
  };

  public render() {
    return (
      <Fragment>
        <ReactTooltip />
        <div className={"post-menu"}>
          <FaThumbsUp data-tip={"Vote Up"} onClick={this.handleUpVote} />
          <FaThumbsDown data-tip={"Vote down"} onClick={this.handleDownVote} />
          <FaTrashAlt
            data-tip={"Delete Post"}
            onClick={this.handlePostDelete}
          />
          <Link to={`/edit/${this.post.id}`}>
            <FaRegEdit data-tip={"Edit Post"} />
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default connect()(PostMenu);

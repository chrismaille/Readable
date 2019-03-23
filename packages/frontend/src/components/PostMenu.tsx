import * as React from "react";
import {
  FaRegEdit,
  FaThumbsDown,
  FaThumbsUp,
  FaTrashAlt
} from "react-icons/fa";
import { connect, DispatchProp } from "react-redux";
import { Link, Redirect } from "react-router-dom";
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

class PostMenu extends React.Component<IProps> {
  public handleUpVote = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    this.props.dispatch(handleUpVotePost(this.props.post));
  };

  public handleDownVote = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    return this.props.dispatch(handleDownVotePost(this.props.post));
  };

  public handlePostDelete = (e: any) => {
    e.preventDefault();
    ReactTooltip.hide();
    // @ts-ignore
    return this.props.dispatch(handleDeletePost(this.props.post));
  };

  public render() {
    if (this.props.post === null) return <Redirect to={"/404"} />;
    return (
      <React.Fragment>
        <ReactTooltip />
        <div className={"post-menu"}>
          <FaThumbsUp data-tip={"Vote Up"} onClick={this.handleUpVote} />
          <FaThumbsDown data-tip={"Vote down"} onClick={this.handleDownVote} />
          <FaTrashAlt
            data-tip={"Delete Post"}
            onClick={this.handlePostDelete}
          />
          <Link to={`/edit/${this.props.post.id}`}>
            <FaRegEdit data-tip={"Edit Post"} />
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({}, ownProps: { post: IPost }) => {
  return {
    post: ownProps.post
  };
};
export default connect(mapStateToProps)(PostMenu);

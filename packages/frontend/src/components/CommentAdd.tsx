import * as _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { handleAddComment } from "../actions/comments";
import { ICreateComment, IPost } from "../PostsAPI";

interface IState {
  author: string;
  body: string;
}

interface IProps extends DispatchProp {
  post: IPost;
}

class CommentAdd extends React.Component<IProps> {
  public state: IState = {
    author: "",
    body: ""
  };

  public render() {
    return (
      <div className={"comment-add"}>
        <textarea
          value={this.state.body}
          cols={1}
          rows={2}
          onChange={this.handleOnChangeBody}
          placeholder={"Add new comment."}
        />
        <div className={"comment-side"}>
          <input
            className={"comment-author"}
            type="text"
            value={this.state.author}
            onChange={this.handleOnChangeAuthor}
            placeholder={"Add username"}
          />
          <button className={"comment-button"} onClick={this.handleOnClick} disabled={this.disableButton()}>
            Add
          </button>
        </div>
      </div>
    );
  }

  public disableButton = () =>
    this.state.body === "" || this.state.author === "";

  public handleOnChangeBody = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    this.setState({ body: event.target.value });
  };

  public handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newComment: ICreateComment = {
      author: this.state.author,
      body: this.state.body,
      id: Math.random()
        .toString(36)
        .replace(/[^a-z:0-9]+/g, "")
        .substr(0, 20),
      parentId: this.props.post.id,
      timestamp: Date.now()
    };
    // @ts-ignore
    this.props.dispatch(handleAddComment(newComment));
    this.setState({body: "", author: ""})
  };

  public handleOnChangeAuthor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ author: _.snakeCase(event.target.value) });
  };
}

const mapStateToProps = ({}, ownProps: { post: IPost }) => {
  return {
    post: ownProps.post
  };
};

export default connect(mapStateToProps)(CommentAdd);

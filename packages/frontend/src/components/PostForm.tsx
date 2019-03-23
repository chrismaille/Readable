import _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { addPost, editPost, handleAddPost, handleEditPost } from "../actions/posts";
import { ICategory, IPost } from "../PostsAPI";
import { IReduxStore } from "../reducers";

interface IPostForm extends DispatchProp, RouteComponentProps {
  posts: IPost[];
  categories: ICategory[];
}

export interface IPostFormState {
  body: string;
  categories: ICategory[];
  selectedCategory: ICategory | null;
  title: string;
  username: string;
  post?: IPost;
}

class PostForm extends React.Component<IPostForm> {
  public state: IPostFormState = {
    body: "",
    categories: [],
    selectedCategory: null,
    title: "",
    username: ""
  };

  public findPostForEdit(postId: string) {
    const { posts } = this.props;
    return _.find(posts, post => post.id === postId && !post.deleted);
  }

  public componentDidMount() {
    const { match, history } = this.props;
    // @ts-ignore
    const { postId } = match.params;
    if (postId) {
      const postForEdit = this.findPostForEdit(postId);
      if (!postForEdit) {
        return history.push("/404");
      }
      this.setState({
        body: postForEdit.body,
        categories: this.props.categories,
        post: postForEdit,
        selectedCategory: {
          label: postForEdit.category,
          value: postForEdit.category
        },
        title: postForEdit.title,
        username: postForEdit.author
      });
    } else {
      this.setState({
        body: "",
        categories: this.props.categories,
        title: "",
        username: ""
      });
    }
  }

  public render() {
    return (
      <div className={"edit-form"}>
        <input
          type="text"
          placeholder="Enter Post Title"
          value={this.state.title}
          onChange={this.changeTitle}
        />
        <textarea
          name="postBody"
          placeholder={"Enter Text"}
          cols={30}
          rows={10}
          value={this.state.body}
          onChange={this.changeBody}
        />
        <div className={"edit-form-footer"}>
          <div className={"edit-form-column"}>
            <input
              type="text"
              placeholder={"Enter you username"}
              value={this.state.username}
              onChange={this.changeUserName}
            />
            <Select
              // @ts-ignore
              value={this.state.selectedCategory}
              onChange={this.changeCategory}
              options={this.props.categories.map(category => ({
                label: category.name,
                value: category.path
              }))}
              placeholder={"Select a Category"}
            />
          </div>
          <div className={"edit-form-column"}>
            <button disabled={!this.canSubmit()} onClick={this.handleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  public handleClick = (e: any) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const originalPost = this.state.post;
    const PostToSend = this.state;
    delete PostToSend.post;
    if (originalPost) {
      // @ts-ignore
      dispatch(handleEditPost(originalPost.id, PostToSend)).then(
        (returnedPost: IPost) => {
          dispatch(editPost(returnedPost));
          history.push("/");
          toast("Post was Edited.");
        }
      );
    } else {
      // @ts-ignore
      dispatch(handleAddPost(PostToSend)).then((returnedPost: IPost) => {
        dispatch(addPost(returnedPost));
        history.push("/");
        toast("New Post added.");
      });
    }
  };

  public canSubmit = () => {
    return (
      this.state.body !== "" &&
      this.state.title !== "" &&
      this.state.selectedCategory !== null &&
      this.state.username !== ""
    );
  };

  public changeCategory = (obj: any) => {
    this.setState({
      selectedCategory: obj
    });
  };

  public changeTitle = (e: any) =>
    this.setState({
      title: e.target.value
    });

  public changeBody = (e: any) =>
    this.setState({
      body: e.target.value
    });

  public changeUserName = (e: any) =>
    this.setState({
      username: _.snakeCase(e.target.value)
    });
}

const mapStateToProps = ({ posts, categories }: IReduxStore) => {
  return {
    categories,
    posts
  };
};

export default withRouter(connect(mapStateToProps)(PostForm));

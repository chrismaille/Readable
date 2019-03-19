import _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import Select from "react-select";
import { toast } from "react-toastify";
import { addPost, handleAddPost } from "../actions/posts";
import { ICategory, IPost } from "../PostsAPI";
import { IReduxStore } from "../reducers";

interface IPostForm extends DispatchProp, RouteComponentProps {
  categories: ICategory[];
}

export interface IPostFormState {
  body: string
  categories: ICategory[]
  selectedCategory: ICategory | null
  title: string
  username: string
}

class PostForm extends React.Component<IPostForm> {
  public state: IPostFormState = {
    body: "",
    categories: [],
    selectedCategory: null,
    title: "",
    username: ""
  };

  public componentDidMount() {
    return this.setState({
      body: "",
      categories: this.props.categories,
      title: "",
      username: ""
    });
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
            <button disabled={!this.canSubmit()} onClick={this.addNewPost}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  public addNewPost = (e: any) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    // @ts-ignore
    dispatch(handleAddPost(this.state)).then((newPost: IPost) => {
      dispatch(addPost(newPost));
      history.push("/");
      toast("New Post added.");
    });
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

const mapStateToProps = ({ categories }: IReduxStore) => {
  return {
    categories
  };
};

export default withRouter(connect(mapStateToProps)(PostForm));

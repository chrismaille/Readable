import _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ICategory, IPost } from "../PostsAPI";
import { IReduxStore } from "../reducers";
import CategoryMenu from "./CategoryMenu";
import Footer from "./Footer";
import Header from "./Header";

interface IProps extends DispatchProp, RouteComponentProps {
  categories: ICategory[];
  posts: IPost[];
}

interface IState {
  post?: IPost;
}

class PostDetail extends React.Component<IProps> {
  public state: IState = {
    post: undefined
  };

  public componentDidMount() {
    const { match, categories, posts, history } = this.props;
    const category = _.find(
      categories,
      // @ts-ignore
      (cat: ICategory) => cat.path === match.params.category
    );
    const post = _.find(
      posts,
      // @ts-ignore
      (p: IPost) => p.id === match.params.postId && p.category === category.path
    );
    if (!post) {
      history.push("/404");
    }
    this.setState({
      post
    });
  }

  public render() {
    const { post } = this.state;
    return (
      <div className="App">
        <Header />
        <section className="App-data">
          <div className="sidebar-menu">
            <CategoryMenu />
            <Footer />
          </div>
          <div className="post-info">
            <div className="post-title">{post && post.title}</div>
            <div className="post-body">{post && post.body}</div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = ({ posts, categories }: IReduxStore) => {
  return {
    categories,
    posts
  };
};

// @ts-ignore
export default withRouter(connect(mapStateToProps)(PostDetail));

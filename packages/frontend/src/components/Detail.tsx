import _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { selectPost } from "../actions/posts";
import { ICategory, IPost } from "../PostsAPI";
import { IReduxStore } from "../reducers";
import Page404 from "./404";
import DetailSection from "./DetailSection";
import Header from "./Header";

export interface IParamProps {
  category: string;
  postId: string;
}

interface IProps extends DispatchProp, RouteComponentProps<IParamProps> {
  categories: ICategory[];
  posts: IPost[];
  selectedPost: IPost | null;
}

class Detail extends React.Component<IProps> {
  public componentDidMount() {
    const { match, categories, posts, dispatch } = this.props;
    const category = _.find(
      categories,
      (cat: ICategory) => cat.path === match.params.category
    );
    const post =
      category &&
      _.find(
        posts,
        (p: IPost) =>
          p.id === match.params.postId && p.category === category.path
      );
    if (post) {
      dispatch(selectPost(post));
    }
  }

  public render() {
    const { selectedPost } = this.props;
    return (
      <div className="App">
        <Header />
        {selectedPost ? <DetailSection /> : <Page404 />}
      </div>
    );
  }
}
const mapStateToProps = ({ posts, categories, selectedPost }: IReduxStore) => {
  return {
    categories,
    posts,
    selectedPost
  };
};

export default withRouter(connect(mapStateToProps)(Detail));

import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { IPost, IPostComment } from "../PostsAPI";
import { IReduxStore } from "../reducers";
import CategoryMenu from "./CategoryMenu";
import CommentsSection from "./CommentsSection";
import { IParamProps } from "./Detail";
import Footer from "./Footer";
import PostMenu from "./PostMenu";

interface IProps extends DispatchProp, RouteComponentProps<IParamProps> {
  comments: IPostComment[];
  selectedPost: IPost;
}

class DetailSection extends React.Component<IProps> {
  public render() {
    if (!this.props.selectedPost) return <Redirect to={"/404"} />;
    const {
      title,
      body,
      author,
      timestamp,
      voteScore
    } = this.props.selectedPost;
    return (
      <section className="App-data">
        <div className="sidebar-menu">
          <CategoryMenu />
          <Footer />
        </div>
        <div className="post-info">
          <div className="post-title">{title}</div>
          <div className="post-detail-subtitle">
            <div className="post-detail-data">
              <div>
                Author: <span>{author}</span>
              </div>
              <div>
                Date: <span>{new Date(timestamp).toLocaleDateString()}</span>
              </div>
              <div>
                Votes: <span>{voteScore}</span>
              </div>
            </div>
            <div>
              <PostMenu post={this.props.selectedPost} />
            </div>
          </div>
          <div className="post-body">{body}</div>
          <CommentsSection />
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ selectedPost, comments }: IReduxStore) => {
  return {
    comments,
    selectedPost
  };
};

// @ts-ignore
export default withRouter(connect(mapStateToProps)(DetailSection));

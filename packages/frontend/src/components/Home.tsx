import _ from "lodash";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { selectCategory } from "../actions/categories";
import { ICategory } from "../PostsAPI";
import { IReduxStore } from "../reducers";
import Page404 from "./404";
import Header from "./Header";
import HomeSection from "./HomeSection";

interface IProps extends DispatchProp, RouteComponentProps {
  categories: ICategory[];
  selectedCategory: ICategory | null;
}

class Home extends React.Component<IProps> {
  public componentDidMount() {
    const { match, categories, dispatch } = this.props;
    const category = _.find(
      categories,
      // @ts-ignore
      (cat: ICategory) => cat.path === match.params.category
    );
    dispatch(selectCategory(category || null));
  }

  public render() {
    const { url } = this.props.match;
    const canShowData = url === "/" || this.props.selectedCategory;
    return (
      <div className="App">
        <Header />
        {canShowData ? <HomeSection /> : <Page404 />}
      </div>
    );
  }
}

const mapStateToProps = ({ categories, selectedCategory }: IReduxStore) => {
  return {
    categories,
    selectedCategory
  };
};

export default connect(mapStateToProps)(Home);

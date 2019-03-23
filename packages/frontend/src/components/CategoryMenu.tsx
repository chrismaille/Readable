import _ from "lodash";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { selectCategory } from "../actions/categories";
import { ICategory } from "../PostsAPI";
import { IReduxStore } from "../reducers";

interface IParamsProps {
  category: string
}

interface IProps extends DispatchProp, RouteComponentProps<IParamsProps> {
  categories: ICategory[];
}

class CategoryMenu extends React.Component<IProps> {
  public handleOnClick = (e: any) => {
    e.preventDefault();
    const { categories, history, dispatch } = this.props;
    const categoryValue = e.target.innerText.toLowerCase();
    const category = _.find(categories, o => o.path === categoryValue) || null;
    dispatch(selectCategory(category));
    history.push(`/${categoryValue}`);
  };

  public render() {
    const { categories, match } = this.props;
    return (
      <ul className="sidebar-menu">
        {categories.map(category => {
          const className =
            category.path === match.params.category
              ? "menu-item button-active"
              : "menu-item";
          return (
            <li
              onClick={this.handleOnClick}
              key={category.path}
              className={className}
            >
              {_.capitalize(category.name)}
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = ({ categories }: IReduxStore) => {
  return {
    categories
  };
};

export default withRouter(connect(mapStateToProps)(CategoryMenu));

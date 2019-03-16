import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ICategory } from "../PostsAPI";
import { IReduxStore } from "../reducers";

interface IProps {
  categories: ICategory[];
  dispatch: Dispatch<any>;
}

const CategoryMenu = (props: IProps) => {
  const { categories } = props;
  return (
    <ul className="sidebar-menu">
      {categories.map(category => (
        <li key={category.path} className="menu-item">
          {_.capitalize(category.name)}
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = ({ categories }: IReduxStore) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(CategoryMenu);

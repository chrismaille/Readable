import * as _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ISortValue } from "../actions/sorts";
import { ICategory } from "../PostsAPI";
import { IReduxStore } from "../reducers";

interface IProps {
  dispatch: Dispatch<any>;
  sort: ISortValue;
  selectedCategory: ICategory | null;
}

const PostListTitle = (props: IProps) => {
  const categoryName = props.selectedCategory
    ? _.capitalize(props.selectedCategory.name)
    : "";
  return (
    <div className="post-list-header">
      <span>{categoryName} </span>Posts by {props.sort.label}
    </div>
  );
};

const mapStateToProps = ({ sort, selectedCategory }: IReduxStore) => {
  return {
    selectedCategory,
    sort
  };
};

export default connect(mapStateToProps)(PostListTitle);

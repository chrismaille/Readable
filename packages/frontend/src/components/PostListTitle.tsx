import * as _ from "lodash";
import React from "react";
import { connect, DispatchProp } from "react-redux";
import { ISortValue } from "../actions/sorts";
import { ICategory } from "../PostsAPI";
import { IReduxStore } from "../reducers";

interface IProps extends DispatchProp {
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

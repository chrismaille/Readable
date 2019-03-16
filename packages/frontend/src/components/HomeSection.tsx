import * as React from "react";
import { connect } from "react-redux";
import { IReduxStore } from "../reducers";
import CategoryMenu from "./CategoryMenu";
import PostList from "./PostList";
import SelectSort from "./SelectSort";

export const HomeSection = () => (
  <section className="App-data">
    <div className="sidebar-menu">
      <CategoryMenu/>
      <SelectSort/>
    </div>
    <PostList/>
  </section>
);

const mapStateToProps = ({ selectedCategory }: IReduxStore) => {
  return {
    selectedCategory
  };
};

export default connect(mapStateToProps)(HomeSection);

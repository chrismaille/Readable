import * as React from "react";
import CategoryMenu from "./CategoryMenu";
import Footer from "./Footer";
import PostList from "./PostList";
import SelectSort from "./SelectSort";

export const HomeSection = () => (
  <section className="App-data">
    <div className="sidebar-menu">
      <CategoryMenu />
      <SelectSort />
      <Footer />
    </div>
    <PostList />
  </section>
);

export default HomeSection;

import * as React from "react";
import PostList from "./PostList";
import Sidebar from "./Sidebar";

export const HomeSection = () => (
  <section className="App-data">
    <Sidebar />
    <PostList />
  </section>
);

export default HomeSection;

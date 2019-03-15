import * as React from "react";
import { Header } from "./Header";
import PostList from "./PostList";
import Sidebar from "./Sidebar";

const Home = () => (
  <div className="App">
    <Header/>
    <section className="App-data">
      <Sidebar/>
      <PostList/>
    </section>
  </div>
);

export default Home;

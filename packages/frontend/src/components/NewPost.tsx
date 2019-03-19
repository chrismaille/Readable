import * as React from "react";
import Header from "./Header";
import PostForm from "./PostForm";

const NewPost = () => (
  <div className="App">
    <Header/>
    <h1 className={"edit-form-title"}>Add New Post</h1>
    <div className={"edit-container"}>
      <PostForm />
    </div>

  </div>
);

export default NewPost;

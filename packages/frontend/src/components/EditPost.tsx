import * as React from "react";
import Header from "./Header";
import PostForm from "./PostForm";

const EditPost = () => (
  <div className="App">
    <Header />
    <h1 className={"edit-form-title"}>Edit Post</h1>
    <div className={"edit-container"}>
      <PostForm />
    </div>
  </div>
);

export default EditPost;

import * as React from "react";
import "./App.css";
import logoSvg from "./logo.svg";
import { api, Category } from "./PostsAPI";

class App extends React.Component {
  public state = {
    categories: []
  };

  public async componentDidMount() {
    const data = await api.getCategories();
    this.setState({ categories: data });
  }

  public render() {
    const { categories } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoSvg} className="App-logo" alt="logo" />
          {categories.map((category: Category) => {
            return <p key={category.path}>{category.name}</p>;
          })}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

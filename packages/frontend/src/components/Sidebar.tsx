import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { Dispatch } from "redux";
import { changeSort, SortOptions } from "../actions/shared";
import { Category } from "../PostsAPI";
import { ReduxStore } from "../reducers";

interface Props {
  categories: Category[];
  sort: SortOptions;
  dispatch: Dispatch<any>;
}

class Sidebar extends React.Component<Props> {
  public handleChange = ({ value }: any) =>
    this.props.dispatch(changeSort(value));

  public render() {
    const { categories, sort } = this.props;
    return (
      <div>
        <ul className="sidebar-menu">
          {categories.map(category => (
            <li key={category.path} className="menu-item">
              {category.name}
            </li>
          ))}
        </ul>
        <Select
          value={sort}
          onChange={this.handleChange}
          options={[
            { value: "Vote", label: "Vote" },
            { value: "Date", label: "Date" }
          ]}
          placeholder={"Sort By"}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, sort }: ReduxStore) => {
  return {
    categories,
    sort
  };
};

export default connect(mapStateToProps)(Sidebar);

import React from "react";
import { connect, DispatchProp } from "react-redux";
import Select from "react-select";
import { changeSort, ISortValue, sortValues } from "../actions/sorts";
import { IReduxStore } from "../reducers";

interface IProps extends DispatchProp {
  sort: ISortValue;
}

class SelectSort extends React.Component<IProps> {
  public handleChange = ({ value, label }: any) =>
    this.props.dispatch(changeSort({ label, value }));

  public render() {
    const { sort } = this.props;
    return (
      <Select
        value={sort}
        onChange={this.handleChange}
        options={sortValues}
        placeholder={"Sort By"}
      />
    );
  }
}

const mapStateToProps = ({ sort }: IReduxStore) => {
  return {
    sort
  };
};

export default connect(mapStateToProps)(SelectSort);

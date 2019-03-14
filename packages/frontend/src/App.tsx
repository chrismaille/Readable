import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { finishLoading, handleInitialData } from "./actions/shared";
import "./App.css";
import Home from "./components/Home";
import Loading from "./components/Loading";
import { ReduxStore } from "./reducers";

interface Props {
  loading: boolean;
  dispatch: Dispatch<any>;
}

class App extends React.Component<Props> {
  public async componentDidMount() {
    await this.props.dispatch(handleInitialData());
    this.props.dispatch(finishLoading(false));
  }

  public render() {
    return <Fragment>{this.props.loading ? <Loading /> : <Home />}</Fragment>;
  }
}

const mapStateToProps = ({ loading }: ReduxStore) => {
  return {
    loading
  };
};
export default connect(mapStateToProps)(App);

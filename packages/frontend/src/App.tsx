import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Dispatch } from "redux";
import { finishLoading, handleInitialData } from "./actions/loading";
import "./App.css";
import Home from "./components/Home";
import Loading from "./components/Loading";
import { IReduxStore } from "./reducers";

interface IProps {
  loading: boolean;
  dispatch: Dispatch<any>;
}

class App extends React.Component<IProps> {
  public async componentDidMount() {
    await this.props.dispatch(handleInitialData());
    this.props.dispatch(finishLoading(false));
  }

  public render() {
    return (
      <Router>
        {this.props.loading ? (
          <Loading />
        ) : (
          <Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/:category" component={Home} />
          </Fragment>
        )}
      </Router>
    );
  }
}

const mapStateToProps = ({ loading }: IReduxStore) => {
  return {
    loading
  };
};
export default connect(mapStateToProps)(App);

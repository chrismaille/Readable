import React, { Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dispatch } from "redux";
import { finishLoading, handleInitialData } from "./actions/loading";
import "./App.css";
import Page404 from "./components/404";
import EditPost from "./components/EditPost";
import Home from "./components/Home";
import Loading from "./components/Loading";
import NewPost from "./components/NewPost";
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
            <ToastContainer />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/new" exact component={NewPost} />
              <Route path="/edit/:postId" component={EditPost} />
              <Route path="/:category" component={Home} />
              <Route path="*" component={Page404} />
            </Switch>
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

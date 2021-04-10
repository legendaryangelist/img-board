import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Urls from "./Urls";
import Layout from "./components/Layouts/Layout";
import * as actions from "./store/actions/auth/authActions";
import "./App.css";

function App(props) {
  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    props.setAuthenticatedIfRequired();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Layout {...props}>
            <Urls {...props} />
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

//This means that one or more of the redux states in the store are available as props
const mapStateToProps = (state) => {
  return {
    isAuthenticated:
      state.auth.token !== null && typeof state.auth.token !== "undefined",
    token: state.auth.token,
  };
};

//This means that one or more of the redux actions in the form of dispatch(action) combinations are available as props
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

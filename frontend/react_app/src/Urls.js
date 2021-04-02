import React from "react";
import { Route, Switch, Redirect, useHistory} from "react-router-dom";
import Login from "./components/Login";
import PasswordUpdate from "./components/PasswordUpdate";
import Home from "./components/Home";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import Favorites from "./components/Favorites";
import Board from "./components/Board";
import Boards from "./components/Boards";
import BoardForm from "./components/BoardForm";
import { useDispatch } from "react-redux";
import { getBoardData } from "./store/dataActions/boardData";
import * as actions from "./store/appActions";
import ThreadForm from "./components/ThreadForm";
import Thread from "./components/Thread";

// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({ isAuthenticated, children, ...rest }) {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (children) : (
          <Redirect
            to={{
              pathname: "/login/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}


function Urls(props) {
  const dispatch = useDispatch();
  dispatch(actions.startLoading());
  getBoardData()(dispatch);

  return (
    <div>
      <Switch>

        {/* ----- Login ----- */}
        <Route exact path="/login/">
          {" "}
          <Login {...props} />
        </Route>

        {/* ----- Password Update ----- */}
        <PrivateRoute
          exact
          path="/password_update/"
          isAuthenticated={props.isAuthenticated}>
          <PasswordUpdate {...props} />
        </PrivateRoute>

        {/* ----- Authenticated ----- */}
        <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}>
          <Home {...props} />
        </PrivateRoute>

        {/* ----- Board ID ----- */}
        <Route exact path="/boards/:boardid/:all">
          <Board />
        </Route>

        {/* ----- Boards ----- */}
        <Route exact path="/boards">
          <Boards />
        </Route>

        {/* ----- Board Form ----- */}
        <Route exact path="/board-form">
          <BoardForm />
        </Route>

        {/* ----- Thread Form ----- */}
        <Route exact path="/thread-form/:boardid/">
          <ThreadForm />
        </Route>

        {/* ----- Posts ----- */}
        <Route exact path="/posts/:threadid">
          <Posts />
        </Route> 

        {/* ----- Post Form ----- */}
        <Route exact path="/post-form/:boardid/:threadid/:postid">
          <PostForm />
        </Route>           

        {/* ----- Favorites ----- */}
        <Route exact path="/favorites">
          <Favorites />
          <Route exact path="/thread/:threadid">
            <Thread />
          </Route>
        </Route>

      </Switch>
    </div>
  );
}

export default Urls;

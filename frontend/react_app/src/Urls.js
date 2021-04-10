import React from "react";
import { Route, Switch, Redirect, useHistory} from "react-router-dom";
import Login from "./components/Auth/Login";
import PasswordUpdate from "./components/Auth/PasswordUpdate";
import Home from "./components/Layouts/Home";
import Posts from "./components/Imageboard/Posts";
import PostForm from "./components/Imageboard/PostForm";
import Favorites from "./components/Imageboard/Favorites";
import Board from "./components/Imageboard/Board";
import Boards from "./components/Imageboard/Boards";
import BoardForm from "./components/Imageboard/BoardForm";
import { useDispatch } from "react-redux";
import * as actions from "./store/actions/app/appActions";
import ThreadForm from "./components/Imageboard/ThreadForm";
import Thread from "./components/Imageboard/Thread";
import Threads from "./components/Imageboard/Threads";


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
  // getBoardData()(dispatch);

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

        {/* ----- Threads ----- */}
        <Route exact path="/threads">
          <Threads />
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

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import PasswordUpdate from "./components/PasswordUpdate";
import Home from "./components/Home";
import Posts from "./components/Posts";
import PostFrom from "./components/PostForm";
import Favorites from "./components/Favorites";
import Boards from "./components/Boards";
import boardForm from "./components/BoardForm";
import Board from "./components/Board";
import BoardForm from "./components/BoardForm";
// A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
function PrivateRoute({ isAuthenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
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
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login/">
            {" "}
            <Login {...props} />
          </Route>
          <PrivateRoute
            exact
            path="/password_update/"
            isAuthenticated={props.isAuthenticated}
          >
            <PasswordUpdate {...props} />
          </PrivateRoute>
          <PrivateRoute exact path="/" isAuthenticated={props.isAuthenticated}>
            <Home {...props} />
          </PrivateRoute>
          <Route exact path="/Posts">
            <Posts />
          </Route>
          <Route exact path="/boardpost/:boardsid/:postid">
            <PostFrom />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/boards">
            <Boards />
          </Route>
          <Route exact path="/boardForm">
            <BoardForm />
          </Route>
          <Route exact path="board/:boardid">
            <Board />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Urls;

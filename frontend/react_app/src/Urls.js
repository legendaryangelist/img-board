import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import PasswordUpdate from "./components/PasswordUpdate";
import Home from "./components/Home";
import Comments from "./components/Comments";
import FromComment from "./components/FormComment";
import Favorites from "./components/Favorites";
import Forums from "./components/Forums";
import FromFurom from "./components/FormForum";
import Forum from "./components/Forum";
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
          <Route exact path="/comments">
            <Comments />
          </Route>
          <Route exact path="/forumcomment/:forumsid/:commentid">
            <FromComment />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/forums">
            <Forums />
          </Route>
          <Route exact path="/fromFurom">
            <FromFurom />
          </Route>
          <Route exact path="forum/:forumid">
            <Forum />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Urls;

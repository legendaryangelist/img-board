import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reportWebVitals from "./reportWebVitals";
import authReducer from "./store/reducers/authReducer";
import appReducer from "./store/reducers/appReducer";
import "bootstrap/dist/css/bootstrap.css";

const reducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

// Official explaination here: https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-will-not-run-if-the-store-state-is-the-same
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // The first one is to make the chrome dev extension work
const middlewares = [
  logger,     // Logger is used to log all redux state changes
  thunk       // Thunk wraps the dispatch actions into custom functions which are available with the mapDispatchToProps
];
const store = createStore(reducer, composeEnhanced(applyMiddleware(...middlewares))); // We are using thunk, because it allows delaying the dispatch actions


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
reportWebVitals();

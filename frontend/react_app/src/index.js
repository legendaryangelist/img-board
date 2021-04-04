import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import authReducer from "./store/authReducer";
import reportWebVitals from "./reportWebVitals";
import { appReducer } from "./store/appReducer";
import "bootstrap/dist/css/bootstrap.css";

const reducer = combineReducers({
  auth: authReducer,
  appstate: appReducer,
}); // Using Combine Reducers here although only one reducer is present.
// Official explaination here: https://react-redux.js.org/using-react-redux/connect-mapstate#mapstatetoprops-will-not-run-if-the-store-state-is-the-same
const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // The first one is to make the chrome dev extension work
const middlewares = [
  logger, 
  thunk
];
const store = createStore(reducer, composeEnhanced(applyMiddleware(...middlewares))); // We are using thunk, because it allows delaying the dispatch actions
// Thunk wraps the dispatch actions into custom functions which are available with the mapDispatchToProps

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

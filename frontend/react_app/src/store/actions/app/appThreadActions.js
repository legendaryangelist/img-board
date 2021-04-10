import axios from "axios";
import * as actions from "./appActions";
import * as actionsTypes from "./appActionTypes";
import * as settings from "../../../settings";

export const getThreadsAction = (threads) => {
  return { 
    type: actionsTypes.GET_THREADS, 
    payload: threads,  
  };
};

// export const authLogin = (username, email, password) => {
//   return (dispatch) => {
//     dispatch(authStart());
//     axios
//       .post(`${settings.API_SERVER}/api/auth/login/`, {
//         username: username,
//         email: email,
//         password: password,
//       })
//       .then((res) => {
//         const token = res.data.key;
//         const expirationDate = new Date(
//           new Date().getTime() + SESSION_DURATION
//         );
//         localStorage.setItem("token", token);
//         localStorage.setItem("expirationDate", expirationDate);
//         dispatch(authSuccess(token));
//         dispatch(authCheckTimeout(SESSION_DURATION));
//       })
//       .catch((err) => {
//         dispatch(authFail(err));
//       });
//   };
// };

export function getThreads() {
  return (dispatch) => {
    dispatch(actions.appStart());
    axios.get(`${settings.API_SERVER}/api/app/threads/`)
    .then((res) => {
      let threads = {};
      const results = res.data.results;
      if (Array.isArray(results)){
        results.map((thread) => threads[thread.id] = thread);       
      }
      else{
        threads = results;
      }
      dispatch(getThreadsAction(threads));
    })
    .catch((err) => {
      console.log(err);
    });
  };
}

export function getThreadsByBoard(boardid) {
  const threadData = axios.get(`${settings.API_SERVER}/api/app/boards/${boardid}/threads/`)
    .then((res) => {
      console.log(res); // TODO: temp console log
    })
    .catch((err) => {
      console.log(err);
    });

  return (dispatch) => {
    threadData.then((data) => {
      dispatch({ type: "GET_THREADS", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

export function postThreadByBoard(boardid, thread) {
  const threadData = axios.post(
    `${settings.API_SERVER}/api/app/boards/${boardid}/threads/`,
    thread
  );

  return (dispatch) => {
    threadData.then((data) => {
      dispatch({ type: "ADD_THREAD", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

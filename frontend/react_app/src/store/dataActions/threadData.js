import axios from "axios";
import * as actions from "../appActions";
import * as settings from "../../settings";


export function getThreads() {
  return (dispatch) => {
    axios.get(`${settings.API_SERVER}/api/app/threads/`)
    .then((res) => {
      console.log(res);
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
      dispatch({ type: "THREAD_DATA", payload: data.data });
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

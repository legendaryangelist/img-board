import axios from "axios";
import * as actions from "../appActions";
import * as settings from "../../settings";


export function getThreadData(boardid) {
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

export function postThreadData(boardid, thread) {
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

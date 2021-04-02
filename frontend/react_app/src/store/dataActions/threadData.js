import axios from "axios";
import * as settings from "../../settings";
import Board from "../../components/Board";
import * as actions from "../appActions";

export function getThreadDatas(boardid) {
  const threadData = axios.get(
    `${settings.API_SERVER}/api/app/boards/${boardid}/threads/`
  );

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

import axios from "axios";
import Board from "../../components/Board";
import * as actions from "../appActions";

export function getThreadDatas(boardid) {
  const threadData = axios.get(
    `http://127.0.0.1:8000/api/app/boards/${boardid}/threads/`
  );

  return (dispatch) => {
    threadData.then((data) => {
      dispatch({ type: "THREAD_DATA", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

export function postThreadDatas(boardid, thread) {
  const threadData = axios.post(
    `http://127.0.0.1:8000/api/app/boards/${boardid}/threads/`,
    thread
  );

  return (dispatch) => {
    threadData.then((data) => {
      dispatch({ type: "ADD_THREAD", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

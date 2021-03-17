import axios from "axios";
import Board from "../../components/Board";
import * as actions from "../appActions";

export function getThreadDatas(boardid) {
  const threadData = axios.get(
    `http://127.0.0.1:8000/api/app/boards/${boardid}/threads/`
  );

  return (dispatch) => {
    threadData.then((data) => {
      // console.log(data);
      dispatch({ type: "THREAD_DATA", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

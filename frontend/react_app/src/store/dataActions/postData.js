import axios from "axios";
import * as actions from "../appActions";
import Board from "../../components/Board";
import Thread from "../../components/Thread";
export function getPostDatas(boardid, threadid) {
  const postArr = axios.get(
    `http://127.0.0.1:8000/api/app/boards/${boardid}/${threadid}/posts`
  );

  return (dispatch) => {
    postArr.then((data) => {
      console.log(data);
      dispatch({ type: "POST_DATA", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

export function postPostDatas(boardid, threadid, post) {
  const postArr = axios.post(
    `http://127.0.0.1:8000/api/app/boards/${boardid}/${threadid}/post`,
    post
  );

  return (dispatch) => {
    postArr.then((data) => {
      dispatch({ type: "ADD_POST", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

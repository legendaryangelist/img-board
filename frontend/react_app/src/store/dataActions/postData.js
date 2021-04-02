import axios from "axios";
import * as actions from "../appActions";
import Board from "../../components/Board";
import Thread from "../../components/Thread";
export function getPostDatas(boardid, threadid) {
  const postData = axios.get(
    `http://127.0.0.1:8000/api/app/boards/${boardid}/threads/${threadid}/posts/`
  );

  return (dispatch) => {
    postData.then((data) => {
      dispatch({ type: "POST_DATA", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

export function postPostDatas(boardid, threadid, post) {
  const postData = axios.post(
    `http://127.0.0.1:8000/api/app/boards/${boardid}/${threadid}/post/`,
    post
  );

  return (dispatch) => {
    postData.then((data) => {
      dispatch({ type: "ADD_POST", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

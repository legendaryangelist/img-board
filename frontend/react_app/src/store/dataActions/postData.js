import axios from "axios";
import * as actions from "../appActions";
import * as settings from "../../settings";
import Board from "../../components/Board";
import Thread from "../../components/Thread";


export function getPostData(boardid, threadid) {
  const postData = axios.get(
    `${settings.API_SERVER}/api/app/boards/${boardid}/threads/${threadid}/posts/`
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
    `${settings.API_SERVER}/api/app/boards/${boardid}/${threadid}/post/`,
    post
  );

  return (dispatch) => {
    postData.then((data) => {
      dispatch({ type: "ADD_POST", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

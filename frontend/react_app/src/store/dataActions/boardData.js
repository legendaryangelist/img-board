import axios from "axios";
import * as actions from "../appActions";

export function getBoardData() {
  const boardData = axios.get("http://127.0.0.1:8000/api/app/boards/");

  return (dispatch) => {
    boardData.then((data) => {
      dispatch({ type: "BOARD_DATA", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

export const postBoardData = (board) => {
  const boardData = axios.post("http://127.0.0.1:8000/api/app/boards/", board);

  return (dispatch) => {
    boardData.then((data) => {
      dispatch({ type: "ADD_BOARD", payload: board });
      dispatch(actions.stopLoading());
    });
  };
};

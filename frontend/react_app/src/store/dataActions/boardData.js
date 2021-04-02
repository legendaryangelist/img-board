import axios from "axios";
import * as settings from "../../settings";
import * as actions from "../appActions";

export function getBoardData() {
  const boardData = axios.get(`${settings.API_SERVER}/api/app/boards/`);

  return (dispatch) => {
    boardData.then((data) => {
      dispatch({ type: "BOARD_DATA", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

export const postBoardData = (board) => {
  const boardData = axios.post(`${settings.API_SERVER}/api/app/boards/`, board);

  return (dispatch) => {
    boardData.then((data) => {
      dispatch({ type: "ADD_BOARD", payload: board });
      dispatch(actions.stopLoading());
    });
  };
};

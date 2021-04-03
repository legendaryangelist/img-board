
import axios from "axios";
import * as actions from "../appActions";
import * as settings from "../../settings";


export function GetBoardData() {
  const boardData = axios.get(`${settings.API_SERVER}/api/app/boards/`)
    .then((res) => {
      console.log(res); // TODO: temp console log
    })
    .catch((err) => {
      console.log(err);
    });

  return (dispatch) => {
    boardData.then((data) => {
      // dispatch({ type: "BOARD_DATA", payload: data.data });
      // dispatch(actions.stopLoading());
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

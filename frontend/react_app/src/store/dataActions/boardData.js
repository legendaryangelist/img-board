
import axios from "axios";
import * as actions from "../appActions";
import * as settings from "../../settings";

// export const authLogin = (username, email, password) => {
//   return (dispatch) => {
//     dispatch(authStart());
//     axios
//       .post(`${settings.API_SERVER}/api/auth/login/`, {
//         username: username,
//         email: email,
//         password: password,
//       })
//       .then((res) => {
//         const token = res.data.key;
//         const expirationDate = new Date(
//           new Date().getTime() + SESSION_DURATION
//         );
//         localStorage.setItem("token", token);
//         localStorage.setItem("expirationDate", expirationDate);
//         dispatch(authSuccess(token));
//         dispatch(authCheckTimeout(SESSION_DURATION));
//       })
//       .catch((err) => {
//         dispatch(authFail(err));
//       });
//   };
// };

export function getBoardData() {

  return (dispatch) => {
    axios.get(`${settings.API_SERVER}/api/app/boards/`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
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

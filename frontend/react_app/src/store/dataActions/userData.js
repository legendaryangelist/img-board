import axios from "axios";
import * as actions from "../appActions";
export function getUserData() {
  const userData = axios.get("http://127.0.0.1:8000/api/auth/users/");

  return (dispatch) => {
    userData.then((data) => {
      console.log(data);
      dispatch({ type: "USER_DATA", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

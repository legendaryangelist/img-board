import axios from "axios";
import * as actions from "../../appActions";
import * as settings from "../../../settings";


export function getUserData() {
  const userData = axios.get(`${settings.API_SERVER}/api/auth/users/`)
    .then((res) => {
      console.log(res); // TODO: temp console log
    })
    .catch((err) => {
      console.log(err);
    });

  return (dispatch) => {
    userData.then((data) => {
      dispatch({ type: "USER_DATA", payload: data });
      dispatch(actions.stopLoading());
    });
  };
}

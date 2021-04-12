import axios from "axios";
import * as actions from "./appActions";
import * as actionTypes from "./appActionTypes";
import * as settings from "../../../settings";

// ########################################################
// ########################################################
// App Thread related Action Functions returning Action Objects
// ########################################################
// ########################################################


export const addThread = (thread) => {
  return { 
    type: actionTypes.ADD_THREAD, 
    payload: thread 
  };
};


export const getThreadsAction = (threads) => {
  return { 
    type: actionTypes.GET_THREADS, 
    threads: threads,
  };
};


export function getThreads(options = {}) {
  return (dispatch) => {
    dispatch(actions.appStart());
    let getURI = `${settings.API_SERVER}/api/app/`;
    let boardid = ('boardid' in options) ? options.board : null;
    let limit = ('limit' in options) ? options.limit : 5;
    let offset = ('offset' in options) ? options.offset : null; 
    
    getURI = (boardid) ? 
      getURI.concat(`boards/${boardid}/threads/?limit=${limit}`) :
      getURI.concat(`threads/?limit=${limit}`);

    if (offset) getURI = getURI.concat(`&offset=${offset}`);
  
    axios.get(getURI).then((res) => {
      let threads = {};
      const results = res.data.results;
      if (Array.isArray(results)){
        results.map((thread) => threads[thread.id] = thread);       
      }
      
      dispatch(getThreadsAction(threads));
    })
    .catch((err) => {
      dispatch(actions.appFail(err));
    });
  };
}

export function postThreadByBoard(boardid, thread) {
  const threadData = axios.post(
    `${settings.API_SERVER}/api/app/boards/${boardid}/threads/`,
    thread
  );

  return (dispatch) => {
    threadData.then((data) => {
      dispatch({ type: "ADD_THREAD", payload: data.data });
      dispatch(actions.stopLoading());
    });
  };
}

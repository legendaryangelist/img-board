import * as actionTypes from "./appActionTypes";

export const appStart = () => {
  return {
    type: actionTypes.APP_START,
  };
};

export const appFail = (error) => {
  return {
    type: actionTypes.APP_FAIL,
    error: error,
  };
};


export const startLoading = () => {
  return { 
    type: actionTypes.LOADING, 
    payload: true };
};


export const stopLoading = () => {
  return { 
    type: actionTypes.LOADING, 
    payload: false };
};



export const addBoard = (board) => {
  return { 
    type: actionTypes.ADD_BOARD, 
    board 
  };
};

export const searchBoard = (value) => {
  return { 
    type: actionTypes.SEARCH_BOARD, 
    value 
  };
};

export const addPosts = (post) => {
  return { type: actionTypes.ADD_POST, post };
};

export const updatePost = () => {
  return { type: actionTypes.UPDATE_POST };
};
export const addToFavorites = (id) => {
  return { type: actionTypes.ADD_TO_FAVORITES, id };
};
export const deletePost = (id) => {
  return { type: actionTypes.DELETE_POST, id };
};

export const searchPost = (value) => {
  return { type: actionTypes.SEARCH_POST, value };
};


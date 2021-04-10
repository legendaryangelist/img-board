import * as actionsTypes from "./appActionTypes";

export const addBoard = (board) => {
  return { 
    type: actionsTypes.ADD_BOARD, 
    board 
  };
};

export const searchBoard = (value) => {
  return { 
    type: actionsTypes.SEARCH_BOARD, 
    value 
  };
};

export const addPosts = (post) => {
  return { type: actionsTypes.ADD_POST, post };
};

export const updatePost = () => {
  return { type: actionsTypes.UPDATE_POST };
};
export const addToFavorites = (id) => {
  return { type: actionsTypes.ADD_TO_FAVORITES, id };
};
export const deletePost = (id) => {
  return { type: actionsTypes.DELETE_POST, id };
};
export const editPost = (post) => {
  return { type: actionsTypes.EDIT_POST, post };
};
export const searchPost = (value) => {
  return { type: actionsTypes.SEARCH_POST, value };
};

export const addThread = (thread) => {
  return { type: actionsTypes.ADD_THREAD, payload: thread };
};
export const startLoading = () => {
  return { type: actionsTypes.LOADING, payload: true };
};
export const stopLoading = () => {
  return { type: actionsTypes.LOADING, payload: false };
};

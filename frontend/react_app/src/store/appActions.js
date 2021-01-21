import * as actionsTypes from "./appActionTypes";

export const addComments = (comment) => {
  return { type: actionsTypes.ADD_COMMENT, comment };
};
export const addForum = (forum) => {
  return { type: actionsTypes.ADD_FORUM, forum };
};
export const updateComment = () => {
  return { type: actionsTypes.UPDATE_COMMENT };
};
export const addToFavorites = (id) => {
  return { type: actionsTypes.ADD_TO_FAVORITES, id };
};
export const deleteComment = (id) => {
  return { type: actionsTypes.DELETE_COMMENT, id };
};
export const editComment = (comment) => {
  return { type: actionsTypes.EDIT_COMMENT, comment };
};
export const searchComment = (value) => {
  return { type: actionsTypes.SEARCH_COMMENT, value };
};
export const searchForum = (value) => {
  return { type: actionsTypes.SEARCH_FORUM, value };
};

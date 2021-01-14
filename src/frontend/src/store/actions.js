export const actionsTypes = {
  ADD_COMMENT: "ADD_COMMENT",
  UPDATE_COMMENT: "UPDATE_COMMENT",
  ADD_TO_FAVORITES: "ADD_TO_FAVORITES",
  DELETE_COMMENT: "DELETE_COMMENT",
  EDIT_COMMENT: "EDIT_COMMENT",
  SEARCH_COMMENT: "SEARCH_COMMENT",
  ADD_FORUM: "ADD_FORUM",
  SEARCH_FORUM: "SEARCH_FORUM",
};

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

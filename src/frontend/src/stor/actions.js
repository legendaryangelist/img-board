export const actionsTypes = {
  ADD_COMMENT: "ADD_COMMENT",
  UP_DATE_COMMENT: "UP_DATE_COMMENT",
  ADD_TO_FIVORIT: "ADD_TO_FIVORIT",
  DELIT_COMMENT: "DELIT_COMMENT",
  EDIT_COMMENT: "EDIT_COMMENT",
  SEARCH_COMMENT: "SEARCH_COMMENT",
};

export const addComments = (comment) => {
  return { type: actionsTypes.ADD_COMMENT, comment };
};

export const upDateComment = () => {
  return { type: actionsTypes.UP_DATE_COMMENT };
};
export const addToFivorit = (id) => {
  return { type: actionsTypes.ADD_TO_FIVORIT, id };
};

export const delitComment = (id) => {
  return { type: actionsTypes.DELIT_COMMENT, id };
};
// export const editComment = (id) => {
//   return { type: EDIT_COMMENT, id };
// };

export const searchComment = (value) => {
  return { type: actionsTypes.SEARCH_COMMENT, value };
};

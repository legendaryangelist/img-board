import { actionsTypes } from "./actions";
let forumData = [
  { title: "sport", description: "aaa", id: 1 },
  { title: "computers", description: "bbb", id: 2 },
  { title: "ccc", description: "ccc", id: 3 },
  { title: "ddd", description: "ddd", id: 4 },
];
let commentArr = [
  {
    title: "aaa",
    text: "asdasdas",
    nickname: "a",
    id: Math.random() * 99999 + 1,
    forumid: 1,
  },
  {
    title: "bbb",
    text: "asdasdas",
    nickname: "b",
    id: Math.random() * 99999 + 1,
    forumid: 2,
  },
  {
    title: "ccc",
    text: "asdasdas",
    nickname: "c",
    id: Math.random() * 99999 + 1,
    forumid: 3,
  },
  {
    title: "ddd",
    text: "asdasdas",
    nickname: "d",
    id: Math.random() * 99999 + 1,
    forumid: 4,
  },
];
const forumSearch = [];
const commentSearch = [];
const favoriteComments = [];
export const commentReducer = (
  state = { commentArr, favoriteComments, commentSearch, forumData, forumSearch },
  action
) => {
  switch (action.type) {
    case actionsTypes.ADD_COMMENT: {
      action.comment.id = Math.random() * 99999 + 9;
      console.log(action);
      return { ...state, commentArr: [...state.commentArr, action.comment] };
    }
    case actionsTypes.ADD_FORUM: {
      action.forum.id = Math.random() * 99999 + 9;
      return { ...state, forumData: [...state.forumData, action.forum] };
    }
    case actionsTypes.UPDATE_COMMENT: {
      const a = state.comment.filter(
        (e) => e.nickname !== commentArr.comment.nickname
      );
      a.push(action.comment);
      return { ...state, commentArr: a };
    }
    case actionsTypes.ADD_TO_FAVORITES: {
      const fiv = state.commentArr.find((e) => e.id === action.id);
      return { ...state, favoriteComments: [...state.favoriteComments, fiv] };
    }
    case actionsTypes.DELETE_COMMENT: {
      const a = state.commentArr.filter((e) => e.id !== action.id);

      return { ...state, commentArr: a };
    }

    case actionsTypes.SEARCH_COMMENT: {
      const { value } = action;
      const commentSearch = state.commentArr.filter(
        (val) => val.title === value || val.text === value
      );
      return { ...state, value, commentSearch };
    }
    case actionsTypes.SEARCH_FORUM: {
      const { value } = action;
      const forumSearch = state.forumData.filter(
        (val) => val.title === value || val.text === value
      );
      return { ...state, value, forumSearch };
    }

    case actionsTypes.EDIT_COMMENT: {
      const arr1 = state.commentArr.filter((e) => e.id !== action.comment.id);
      console.log(action);
      console.log(arr1);
      arr1.push(action.comment);
      return { ...state, commentArr: arr1 };
    }

    default:
      return { ...state };
  }
};

export const getComment = (state) => {
  return state;
};
export const getForum = (state) => {
  return state;
};

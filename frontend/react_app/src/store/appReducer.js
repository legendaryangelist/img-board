import * as actionsTypes from "./appActionTypes";
let boardData = [
  { title: "sport", description: "aaa", id: 1 },
  { title: "computers", description: "bbb", id: 2 },
  { title: "ccc", description: "ccc", id: 3 },
  { title: "ddd", description: "ddd", id: 4 },
];
let postArr = [
  {
    title: "aaa",
    text: "asdasdas",
    nickname: "a",
    id: Math.random() * 99999 + 1,
    boardid: 1,
  },
  {
    title: "bbb",
    text: "asdasdas",
    nickname: "b",
    id: Math.random() * 99999 + 1,
    boardid: 2,
  },
  {
    title: "ccc",
    text: "asdasdas",
    nickname: "c",
    id: Math.random() * 99999 + 1,
    boardid: 3,
  },
  {
    title: "ddd",
    text: "asdasdas",
    nickname: "d",
    id: Math.random() * 99999 + 1,
    boardid: 4,
  },
];
const boardSearch = [];
const postSearch = [];
const favoritePosts = [];
export const appReducer = (
  state = {
    postArr,
    favoritePosts,
    postSearch,
    boardData,
    boardSearch,
  },
  action
) => {
  switch (action.type) {
    case actionsTypes.ADD_POST: {
      action.post.id = Math.random() * 99999 + 9;

      return { ...state, postArr: [...state.postArr, action.post] };
    }
    case actionsTypes.ADD_BOARD: {
      action.board.id = Math.random() * 99999 + 9;
      return { ...state, boardData: [...state.boardData, action.board] };
    }
    case actionsTypes.UPDATE_POST: {
      const a = state.post.filter((e) => e.nickname !== postArr.post.nickname);
      a.push(action.post);
      return { ...state, postArr: a };
    }
    case actionsTypes.ADD_TO_FAVORITES: {
      const fiv = state.postArr.find((e) => e.id === action.id);
      return { ...state, favoriteposts: [...state.favoriteposts, fiv] };
    }
    case actionsTypes.DELETE_POST: {
      const a = state.postArr.filter((e) => e.id !== action.id);

      return { ...state, postArr: a };
    }

    case actionsTypes.SEARCH_POST: {
      const { value } = action;
      const postSearch = state.postArr.filter(
        (val) => val.title === value || val.text === value
      );
      return { ...state, value, postSearch };
    }
    case actionsTypes.SEARCH_BOARD: {
      const { value } = action;
      const boardSearch = state.boardData.filter(
        (val) => val.title === value || val.text === value
      );
      return { ...state, value, boardSearch };
    }

    case actionsTypes.EDIT_POST: {
      const arr1 = state.postArr.filter((e) => e.id !== action.post.id);
      console.log(action);
      console.log(arr1);
      arr1.push(action.post);
      return { ...state, postArr: arr1 };
    }

    default:
      return { ...state };
  }
};

export const getPost = (state) => {
  return state;
};
export const getBoard = (state) => {
  return state;
};

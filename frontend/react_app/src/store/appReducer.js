import axios from "axios";
import * as actionsTypes from "./appActionTypes";
import * as settings from "../settings";
import boardDatas from "./dataActions/boardData";
import threadDatas from "./dataActions/threadData";
import postDatas from "./dataActions/postData";
import userDatas from "./dataActions/userData";
let threadData = [];
let boardData = [];
let postArr = [];
let userData = [];
let postData = [];
const boardSearch = [];
const postSearch = [];
const threadSearch = [];
const favoritePosts = [];

export const appReducer = (
  state = {
    postArr,
    favoritePosts,
    postSearch,
    boardData,
    boardSearch,
    threadData,
    threadSearch,
    isLoading: false,
    userData,
    postData,
  },
  action
) => {
  switch (action.type) {
    case actionsTypes.ADD_POST: {
      action.post.id = Math.random() * 99999 + 9;

      return { ...state, postArr: [...state.postArr, action.post] };
    }
    case actionsTypes.ADD_BOARD: {
      action.payload.board.id = Math.random() * 99999 + 9;
      return {
        ...state,
        boardData: [...state.boardData, action.payload.board],
      };
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
        (val) =>
          val.title.toLowerCase().includes(value.toLowerCase()) ||
          val.description.toLowerCase().includes(value.toLowerCase())
      );
      return { ...state, boardSearch };
    }

    case actionsTypes.EDIT_POST: {
      const arr1 = state.postArr.filter((e) => e.id !== action.post.id);
      arr1.push(action.post);
      return { ...state, postArr: arr1 };
    }
    case actionsTypes.BOARD_DATA: {
      return { ...state, boardData: action.payload };
    }
    case actionsTypes.THREAD_DATA: {
      return {
        ...state,
        threadData: [...state.threadData, ...action.payload],
      };
    }
    case actionsTypes.POST_DATA: {
      return {
        ...state,
        postData: [...state.postData, ...action.payload],
      };
    }
    case actionsTypes.USER_DATA: {
      return {
        ...state,
        userData: [...state.userData, ...action.payload],
      };
    }
    case actionsTypes.LOADING: {
      return { ...state, isLoading: action.payload };
    }

    default:
      return { ...state };
  }
};

export const getPost = (state) => {
  return state;
};
export const getBoard = (state) => {
  return state.boardData;
};
export const getThread = (state) => {
  return state.threadData;
};

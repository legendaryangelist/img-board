import axios from "axios";
import * as actionsTypes from "./appActionTypes";
import * as settings from "../settings";
// import boardData from "./dataActions/boardData";
// import threadData from "./dataActions/threadData";
// import postData from "./dataActions/postData";
// import userData from "./dataActions/userData";

// Init Variables
let boardData = [];
let threadData = [];
let postData = [];
let userData = [];
const boardSearch = [];
const postSearch = [];
const threadSearch = [];
const favoritePosts = [];

// ########################################################
// Initial State
// ########################################################

export const initialState = {
  boardData: [],
  threadData: [],
  postData: [],
  userData: [],
  favoritePosts: [],

  boardSearch: [],
  threadSearch: [],
  postSearch: [],

  isLoading: false,
};

// ########################################################
// The Main Reducer
// ########################################################
export const appReducer = (
  state = {
    postData,
    favoritePosts,
    postSearch,
    boardData,
    boardSearch,
    threadData,
    threadSearch,
    isLoading: false,
    userData,
  },
  action
) => {
  switch (action.type) {
    
    case actionsTypes.ADD_POST: {
      action.post.id = Math.random() * 99999 + 9;

      return { ...state, postData: [...state.postData, action.post] };
    }

    case actionsTypes.ADD_BOARD: {
      action.payload.board.id = Math.random() * 99999 + 9;
      return {
        ...state,
        boardData: [...state.boardData, action.payload.board],
      };
    }

    case actionsTypes.UPDATE_POST: {
      const a = state.post.filter((e) => e.nickname !== postData.post.nickname);
      a.push(action.post);
      return { ...state, postData: a };
    }

    case actionsTypes.ADD_TO_FAVORITES: {
      const fav = state.postData.find((e) => e.id === action.id);
      return { ...state, favoriteposts: [...state.favoriteposts, fav] };
    }

    case actionsTypes.DELETE_POST: {
      const a = state.postData.filter((e) => e.id !== action.id);

      return { ...state, postData: a };
    }

    case actionsTypes.SEARCH_POST: {
      const { value } = action;
      const postSearch = state.postData.filter(
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
      const arr1 = state.postData.filter((e) => e.id !== action.post.id);
      arr1.push(action.post);
      return { ...state, postData: arr1 };
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

export const getBoard = (state) => {
  return state.boardData;
};
export const getThread = (state) => {
  return state.threadData;
};
export const getPost = (state) => {
  return state;
};


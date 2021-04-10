import axios from "axios";
import * as actionTypes from "../actions/app/appActionTypes";
import * as settings from "../../settings";


export const getBoard = (state) => {
  return state.boards;
};

export const getThreadsState = (state) => {
  return state.threads;
};

export const getPost = (state) => {
  return state;
};


// ########################################################
// Initial State
// ########################################################

export const initialState = {
  boards: [],
  threads: [],
  posts: [],
  userData: [],
  favoritePosts: [],

  isLoading: false,
};

// ########################################################
// A simple function to update the state with new values
// ########################################################

const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

// ########################################################
// Different Reducer Functions which change the store state
// ########################################################
const appStartReducer = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const appGetThreadsReducer = (state, action) => {
  return updateObject(state, {
    threads: action.threads,
    isLoading: false,
  });
};


// ########################################################
// The Main Reducer
// ########################################################
const Reducer = (
  state = {
    initialState
  },
  action
) => {
  switch (action.type) {
    
    case actionTypes.APP_START:
      return appStartReducer(state, action);
    case actionTypes.GET_THREADS:
      return appGetThreadsReducer(state, action);

    case actionTypes.ADD_POST: {
      action.post.id = Math.random() * 99999 + 9;

      return { ...state, posts: [...state.posts, action.post] };
    }

    case actionTypes.ADD_BOARD: {
      action.payload.board.id = Math.random() * 99999 + 9;
      return {
        ...state,
        boards: [...state.boards, action.payload.board],
      };
    }

    case actionTypes.UPDATE_POST: {
      const a = state.post.filter((e) => e.nickname !== state.posts.post.nickname);
      a.push(action.post);
      return { ...state, posts: a };
    }

    case actionTypes.ADD_TO_FAVORITES: {
      const fav = state.posts.find((e) => e.id === action.id);
      return { ...state, favoriteposts: [...state.favoriteposts, fav] };
    }

    case actionTypes.DELETE_POST: {
      const a = state.posts.filter((e) => e.id !== action.id);

      return { ...state, posts: a };
    }

    case actionTypes.SEARCH_POST: {
      const { value } = action;
      const postSearch = state.posts.filter(
        (val) => val.title === value || val.text === value
      );
      return { ...state, value, postSearch };
    }

    case actionTypes.SEARCH_BOARD: {
      const { value } = action;
      const boardSearch = state.boards.filter(
        (val) =>
          val.title.toLowerCase().includes(value.toLowerCase()) ||
          val.description.toLowerCase().includes(value.toLowerCase())
      );
      return { ...state, boardSearch };
    }

    case actionTypes.EDIT_POST: {
      const arr1 = state.posts.filter((e) => e.id !== action.post.id);
      arr1.push(action.post);
      return { ...state, posts: arr1 };
    }

    case actionTypes.BOARD_DATA: {
      return { ...state, boards: action.payload };
    }

    case actionTypes.POST_DATA: {
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    }

    case actionTypes.USER_DATA: {
      return {
        ...state,
        userData: [...state.userData, ...action.payload],
      };
    }

    case actionTypes.LOADING: {
      return { ...state, isLoading: action.payload };
    }

    default:
      return state;
  }
};

export default Reducer;
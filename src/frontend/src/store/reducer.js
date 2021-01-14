import { actionsTypes } from "./actions";
let furomData = [
  { titel: "sport", discripsn: "aaa", id: 1 },
  { titel: "computers", discripsn: "bbb", id: 2 },
  { titel: "ccc", discripsn: "ccc", id: 3 },
  { titel: "ddd", discripsn: "ddd", id: 4 },
];
let commentArr = [
  {
    titel: "aaa",
    text: "asdasdas",
    nikname: "a",
    id: Math.random() * 99999 + 1,
    forumid: 1,
  },
  {
    titel: "bbb",
    text: "asdasdas",
    nikname: "b",
    id: Math.random() * 99999 + 1,
    forumid: 2,
  },
  {
    titel: "ccc",
    text: "asdasdas",
    nikname: "c",
    id: Math.random() * 99999 + 1,
    forumid: 3,
  },
  {
    titel: "ddd",
    text: "asdasdas",
    nikname: "d",
    id: Math.random() * 99999 + 1,
    forumid: 4,
  },
];
const furomSearch = [];
const commentSearch = [];
const fivoritComments = [];
export const commentReducer = (
  state = { commentArr, fivoritComments, commentSearch, furomData, furomSearch },
  action
) => {
  switch (action.type) {
    case actionsTypes.ADD_COMMENT: {
      action.comment.id = Math.random() * 99999 + 9;
      console.log(action);
      return { ...state, commentArr: [...state.commentArr, action.comment] };
    }
    case actionsTypes.ADD_FUROM: {
      action.furom.id = Math.random() * 99999 + 9;
      return { ...state, furomData: [...state.furomData, action.furom] };
    }
    case actionsTypes.UP_DATE_COMMENT: {
      const a = state.comment.filter(
        (e) => e.nikname !== commentArr.comment.nikname
      );
      a.push(action.comment);
      return { ...state, commentArr: a };
    }
    case actionsTypes.ADD_TO_FIVORIT: {
      const fiv = state.commentArr.find((e) => e.id === action.id);
      return { ...state, fivoritComments: [...state.fivoritComments, fiv] };
    }
    case actionsTypes.DELIT_COMMENT: {
      const a = state.commentArr.filter((e) => e.id !== action.id);

      return { ...state, commentArr: a };
    }

    case actionsTypes.SEARCH_COMMENT: {
      const { value } = action;
      const commentSearch = state.commentArr.filter(
        (val) => val.titel === value || val.text === value
      );
      return { ...state, value, commentSearch };
    }
    case actionsTypes.SEARCH_FUROM: {
      const { value } = action;
      const furomSearch = state.furomData.filter(
        (val) => val.titel === value || val.text === value
      );
      return { ...state, value, furomSearch };
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

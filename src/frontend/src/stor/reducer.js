import { actionsTypes } from "./actions";

let commentArr = [
  { titel: "aaa", taxt: "asdasdas", nikname: "a", id: 1 },
  { titel: "bbb", taxt: "asdasdas", nikname: "b", id: 2 },
  { titel: "ccc", taxt: "asdasdas", nikname: "c", id: 3 },
  { titel: "ddd", taxt: "asdasdas", nikname: "d", id: 4 },
];
const fivoritComments = [];
const works = [];
const value = "";
export const commentReducer = (
  state = { commentArr, fivoritComments, works, value },
  action
) => {
  switch (action.type) {
    case actionsTypes.ADD_COMMENT: {
      action.comment.id = Math.random() * 99999 + 9;
      return { ...state, commentArr: [...state.commentArr, action.comment] };
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
      const works = state.commentArr.filter((val) => val.includes(value));
      return { ...state, value, works };
    }

    // case actionsTypes.EDIT_COMMENT: {
    //   history.push("/commet");
    //   const edit = action.comment;

    //   return { ...state, edit };
    // }

    default:
      return { ...state };
  }
  console.log(state);
};

export const getComment = (state) => {
  return state;
};

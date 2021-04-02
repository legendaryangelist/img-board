import React from "react";
import { useSelector } from "react-redux";

const SearchBox = (props) => {
  const boardData = useSelector((state) => {
    return state.appstate.boardData;
  });
  return <div></div>;
};

export default SearchBox;

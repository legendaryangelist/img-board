import React from "react";
import { useSelector } from "react-redux";

const SearchResult = (props) => {
  const boardData = useSelector((state) => {
    return state.appstate.boardData;
  });
  return <div></div>;
};

export default SearchResult;

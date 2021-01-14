import React from "react";
import { useSelector } from "react-redux";
import Comment from "./comment";

const Favorites = () => {
  const commentsData = useSelector((state) => {
    return state.fivoritComments;
  });
  return (
    <div>
      {commentsData.map((e) => (
        <Comment key={e.id} comment={e} />
      ))}
    </div>
  );
};
export default Favorites;

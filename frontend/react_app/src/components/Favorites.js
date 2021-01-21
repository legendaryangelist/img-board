import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const Favorites = () => {
  const favoriteComments = useSelector((state) => {
    return state.appstate.favoriteComments;
  });
  return (
    <div>
      {favoriteComments.map((e) => (
        <Comment key={e.id} comment={e} />
      ))}
    </div>
  );
};
export default Favorites;

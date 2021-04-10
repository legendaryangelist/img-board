import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import Board from "./Board";

const Favorites = () => {
  const isLoading = useSelector((state) => {
    return state.app.loading;
  });
  const favoritePosts = useSelector((state) => {
    if (!state.appstate.favoritePosts) {
      return [];
    }
    return state.appstate.boardData.filter((e) =>
      state.appstate.favoritePosts.includes(e.id)
    );
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {favoritePosts.map((e) => (
        <Board key={e.id} boards={e} />
      ))}
    </div>
  );
};
export default Favorites;

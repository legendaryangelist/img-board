import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";

const Favorites = () => {
  const favoritePosts = useSelector((state) => {
    return state.appstate.favoritePosts;
  });
  return (
    <div>
      {favoritePosts.map((e) => (
        <post key={e.id} post={e} />
      ))}
    </div>
  );
};
export default Favorites;

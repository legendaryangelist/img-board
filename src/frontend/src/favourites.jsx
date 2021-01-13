import React from "react";
import { useSelector } from "react-redux";
import Comment from "../ui/comment";

const Favourites = () => {
  const commentsData = useSelector((state) => {
    console.log(state);
    return state.fivoritComments;
  });
  return (
    <div>
      {commentsData.map((e) => (
        <Comment key={e.id} commnt={e} />
      ))}
    </div>
  );
};
export default Favourites;

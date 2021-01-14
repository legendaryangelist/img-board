import React from "react";
import { useSelector } from "react-redux";
import Comment from "../ui/comment";

const Fivorits = () => {
  const commentsData = useSelector((state) => {
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
export default Fivorits;

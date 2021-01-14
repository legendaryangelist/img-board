import React from "react";
import Comment from "./comment";
import { connect } from "react-redux";
import { getComment } from "../store/reducer";
import { Button } from "react-bootstrap";
const Comments = (props) => {
  const { commentsData, history, commentSearch } = props;

  return (
    <div
      className="grid-container"
      style={{ padding: "50px", paddingTop: "20px" }}
    >
      {commentSearch.length === 0
        ? commentsData.map((a) => {
            return <Comment history={history} key={a.nikname} commnt={a} />;
          })
        : commentSearch.map((a) => {
            return <Comment history={history} key={a.nikname} commnt={a} />;
          })}
    </div>
  );
};

const Mapstate = (state) => ({ comment: getComment(state) });

export default connect(Mapstate, null)(Comments);

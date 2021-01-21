import React from "react";
import Comment from "./Comment";
import { connect } from "react-redux";
import { getComment } from "../store/appReducer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const Comments = (props) => {
  const history = useHistory();
  const commentSearch = useSelector((state) => state.appstate.commentSearch);
  const commentArr = useSelector((state) => state.appstate.commentArr);
  const { forumid } = props;
  return (
    <div
      className="grid-container"
      style={{ padding: "50px", paddingTop: "20px" }}
    >
      {commentSearch.length === 0
        ? commentArr
            .filter((e) => e.forumid === forumid)
            .map((a) => {
              return <Comment key={a.nickname} comment={a} />;
            })
        : commentSearch.map((a) => {
            return <Comment key={a.nickname} comment={a} />;
          })}
    </div>
  );
};

const Mapstate = (state) => ({ commentState: getComment(state) });

export default connect(Mapstate, null)(Comments);

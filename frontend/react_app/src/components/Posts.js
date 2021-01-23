import React from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { getPost } from "../store/appReducer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const Posts = (props) => {
  const history = useHistory();
  const postSearch = useSelector((state) => state.appstate.postSearch);
  const postArr = useSelector((state) => state.appstate.postArr);
  const { boardid } = props;
  return (
    <div
      className="grid-container"
      style={{ padding: "50px", paddingTop: "20px" }}
    >
      {postSearch.length === 0
        ? postArr
            .filter((e) => e.boardid === boardid)
            .map((a) => {
              return <Post key={a.nickname} posts={a} />;
            })
        : postSearch.map((a) => {
            return <Post key={a.nickname} posts={a} />;
          })}
    </div>
  );
};

const Mapstate = (state) => ({ postState: getPost(state) });

export default connect(Mapstate, null)(Posts);

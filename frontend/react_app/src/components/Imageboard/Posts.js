import React, { useEffect } from "react";
import Post from "./Post";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { getPostData } from "../../store/actions/app/appPostActions";


const Posts = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  let boardid;
  let { threadid } = params;
  if (!threadid) {
    threadid = props.threadid;
    boardid = props.boardid;
  }
  const postSearch = useSelector((state) => state.appstate.postSearch);
  const postData = useSelector((state) => state.appstate.postData);
  const thread = useSelector((state) =>
    state.appstate.threadData.find((e) => e.id === threadid)
  );
  
  useEffect(() => {
    getPostData(thread.board.split("-").join(""), threadid)(dispatch);
  }, [dispatch, thread.board, threadid]);

  return (
    <div
      className="grid-container"
      style={{ padding: "50px", paddingTop: "20px" }}
    >
      {postData.slice(0, 4).map((a) => {
        return <Post posts={a} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => { 
  return {
    posts: state.posts
  }
};

export default connect(mapStateToProps, null)(Posts);

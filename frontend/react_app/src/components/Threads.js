import React, { useEffect } from "react";
import Thread from "./Thread";
import { Button, Row } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import { getThread } from "../store/appReducer";
import { useHistory, Link } from "react-router-dom";
import { getThreadDatas } from "../store/dataActions/threadData";

const Threads = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { boardid } = props;
  const isLoading = useSelector((state) => {
    return state.appstate.isLoading;
  });
  const threadData = useSelector((state) => {
    const currentThreads = state.appstate.threadData.filter(
      (t) => t.board.split("-").join("") === boardid
    );
    return currentThreads;
  });
  const threadSearch = useSelector((state) => state.appstate.threadSearch);
  useEffect(() => {
    // console.log(boardid);
    getThreadDatas(boardid)(dispatch);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Button className="commentBu" onClick={() => history.push("/boardForm")}>
        add board
      </Button>
      <Row style={{ display: "flex", flexWrap: "wrap" }}>
        <div>a{threadData.length}</div>
        {threadSearch.length === 0
          ? threadData.slice(0, 4).map((e) => {
              console.log("ferdrhcyluiyui", e);
              return (
                <span key={e.id}>
                  <Link to={{ pathname: `thread/${e.id}` }}>{e.title}</Link>
                  <Thread thread={e} />
                </span>
              );
            })
          : threadSearch.map((e) => <span key={e.id}>I AM NOT HERE</span>)}
        {"   "}
      </Row>
    </div>
  );
};
const Mapstate = (state) => ({ Thread: getThread(state) });

export default connect(Mapstate, null)(Threads);

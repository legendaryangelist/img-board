import React, { useEffect } from "react";
import Thread from "./Thread";
import { Button, Container, Row } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import { getThread } from "../store/appReducer";
import { useHistory, Link, useParams } from "react-router-dom";
import { getThreadDatas } from "../store/dataActions/threadData";

const Threads = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
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
    getThreadDatas(boardid)(dispatch);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Row>
        {threadSearch.length === 0
          ? threadData.slice(0, params.all ? threadData.length : 4).map((e) => {
              return (
                <span key={e.id}>
                  <Link
                    to={{ pathname: `thread/${e.id}`, state: { thread: e } }}
                  >
                    {e.title}
                  </Link>
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

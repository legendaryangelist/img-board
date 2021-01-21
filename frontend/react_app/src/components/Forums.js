import React from "react";
import Forum from "./Forum";
import { Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { getForum } from "../store/appReducer";
import { useHistory } from "react-router";

const Forums = (props) => {
  const history = useHistory();
  const forumData = useSelector((state) => state.appstate.forumData);
  const forumSearch = useSelector((state) => state.appstate.forumSearch);

  return (
    <div>
      <Button className="commentBu" onClick={() => history.push("/fromFurom")}>
        add forum
      </Button>
      {forumSearch.length === 0
        ? forumData.map((e) => <Forum key={e.id} forums={e} />)
        : forumSearch.map((e) => <Forum key={e.id} forums={e} />)}
    </div>
  );
};
const Mapstate = (state) => ({ forum: getForum(state) });

export default connect(Mapstate, null)(Forums);

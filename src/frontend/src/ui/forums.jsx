import React from "react";
import Forum from "./forum";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getForum } from "../store/reducer";
const Forums = (props) => {
  const { furomData, history, furomSearch } = props;

  return (
    <div>
      <Button className="commentBu" onClick={() => history.push("/editForum")}>
        add forum
      </Button>
      {furomSearch.length === 0
        ? furomData.map((e) => <Forum key={e.id} forums={e} />)
        : furomSearch.map((e) => <Forum key={e.id} forums={e} />)}
    </div>
  );
};
const Mapstate = (state) => ({ forum: getForum(state) });

export default connect(Mapstate, null)(Forums);

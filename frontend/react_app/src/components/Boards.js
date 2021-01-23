import React from "react";
import Board from "./Board";
import { Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { getBoard } from "../store/appReducer";
import { useHistory } from "react-router";

const Boards = (props) => {
  const history = useHistory();
  const boardData = useSelector((state) => state.appstate.boardData);
  const boardSearch = useSelector((state) => state.appstate.boardSearch);
  const { board } = props;
  return (
    <div>
      <Button className="commentBu" onClick={() => history.push("/boardForm")}>
        add board
      </Button>
      {boardSearch.length === 0
        ? boardData.map((e) => <Board key={e.id} boards={e} />)
        : boardSearch.map((e) => <Board key={e.id} boards={e} />)}
    </div>
  );
};
const Mapstate = (state) => ({ board: getBoard(state) });

export default connect(Mapstate, null)(Boards);

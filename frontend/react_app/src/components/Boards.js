import React, { useEffect } from "react";
import Board from "./Board";
import { Button } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import { getBoard } from "../store/appReducer";
import { useHistory, Link } from "react-router-dom";
import { getBoardData } from "../store/dataActions/boardData";

const Boards = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const boardData = useSelector((state) => state.appstate.boardData);
  const boardSearch = useSelector((state) => state.appstate.boardSearch);
  const { board } = props;
  
  useEffect(() => {
    getBoardData()(dispatch);
  }, []);
  return (
    <div>
      <Button className="commentBu" onClick={() => history.push("/boardForm")}>
        add board
      </Button>
      {boardSearch.length === 0
        ? boardData.map((e) => {
            return (
              <span key={e.id}>
                <Link to={{ pathname: `boards/${e.id}`, state: { boards: e } }}>
                  {e.title}
                </Link>
                <Board boards={e} />
              </span>
            );
          })
        : boardSearch.map((e) => <Board key={e.id} boards={e} />)}
      {"   "}
    </div>
  );
};
const Mapstate = (state) => ({ board: getBoard(state) });

export default connect(Mapstate, null)(Boards);

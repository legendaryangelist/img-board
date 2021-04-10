import React, { useEffect } from "react";
import Board from "./Board";
import { Button } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import { getBoard } from "../../store/appReducer";
import { useHistory, Link, useParams } from "react-router-dom";
import { getBoardData } from "../../store/dataActions/boardData";
import { getUserData } from "../../store/dataActions/userData";
import { getPostData } from "../../store/dataActions/postData";


const Boards = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const boardData = useSelector((state) => state.appstate.boardData);
  // const boardSearch = useSelector((state) => state.appstate.boardSearch);
  // const { board } = props;

  useEffect(() => {
    getBoardData()(dispatch);
    // getUserData()(dispatch);
  }, [dispatch]);
  
  return (
    <div>
      <Button className="commentButton" onClick={() => history.push("/board-form")}>
        Add Board
      </Button>
      {/* {boardSearch.length === 0
        ? boardData.map((e) => {
            return (
              <span key={e.id}>
                <Link to={{pathname: `boards/${e.id}/all=1`, state: { boards: e }, }}>
                  {e.title}
                </Link>
                <Board boards={e} />
              </span>
            );
          })
        : boardSearch.map((e) => <Board key={e.id} boards={e} />)} */}
      {"   "}
    </div>
  );
};

const Mapstate = (state) => ({ 
  board: getBoard(state) 
});

export default connect(Mapstate, null)(Boards);

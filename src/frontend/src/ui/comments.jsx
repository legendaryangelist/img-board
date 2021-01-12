import React from "react";
import Comment from "./comment";
import { connect } from "react-redux";
import { getComment } from "../stor/reducer";
import { Button } from "react-bootstrap";
const Comments = (props) => {
  const { commentsData, history } = props;
  console.log(commentsData);
  return (
    <div
      className="grid-container"
      style={{ padding: "50px", paddingTop: "20px" }}
    >
      <div>
        <Button onClick={() => history.push("/fromcomment/:id")}>
          add comment
        </Button>
      </div>
      {commentsData.map((a) => (
        <Comment key={a.nikname} commnt={a} />
      ))}
      {/* {com.map((e) => (
        <Comment key={e.id} commnt={e} />
      ))} */}
    </div>
  );
};

const Mapstate = (state) => ({ comment: getComment(state) });

export default connect(Mapstate, null)(Comments);

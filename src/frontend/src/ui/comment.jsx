import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToFivorit, delitComment } from "../store/actions";

const Comment = (props) => {
  const { commnt, onaddToFivorit, ondelitComment, history } = props;
  return (
    <>
      <Card
        style={{
          width: "18rem",
          backgroundColor: "#D8D8D8",

          margin: "10px 10px 10px 10px",
        }}
      >
        <Card.Body>
          <Card.Title>{commnt.titel}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {commnt.nikname}
          </Card.Subtitle>
          <Card.Text>{commnt.text}</Card.Text>
          <Button
            className="commentBu"
            onClick={() =>
              history.push(`/fromcomment/${commnt.forumid}/${commnt.id}`)
            }
          >
            edit
          </Button>
          <Button
            className="commentBu"
            onClick={() => ondelitComment(commnt.id)}
          >
            delit
          </Button>
          <Button
            className="commentBu"
            onClick={() => onaddToFivorit(commnt.id)}
          >
            fivorit
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
const redux = (dispatch) =>
  bindActionCreators(
    {
      onaddToFivorit: addToFivorit,
      ondelitComment: delitComment,
    },
    dispatch
  );
export default connect(null, redux)(Comment);

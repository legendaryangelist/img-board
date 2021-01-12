import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToFivorit, delitComment } from "../stor/actions";

const Comment = (props) => {
  
  const { commnt, onaddToFivorit, ondelitComment } = props;
  return (
    <>
      <Card style={{ width: "18rem", backgroundColor: "#D8D8D8" }}>
        <Card.Body>
          <Card.Title>{commnt.titel}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {commnt.nikname}
          </Card.Subtitle>
          <Card.Text>{commnt.body}</Card.Text>
          <Button>edit comment</Button>
          <Button onClick={() => ondelitComment(commnt.id)}>
            delit comment
          </Button>
          <Button onClick={() => onaddToFivorit(commnt.id)}>fivorit</Button>
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

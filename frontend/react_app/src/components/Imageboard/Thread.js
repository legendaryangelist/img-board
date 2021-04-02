import React from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import Board from "./Board";


const Thread = (props) => {
  const params = useParams();
  const history = useHistory();
  const thread = useSelector((state) => {
    return state.appstate.threadData.find(
      (e) => e.id === params.threadid || props.thread.id
    );
  });

  return (
    <div>
      <Container>
        <Link to={{ pathname: `posts/${thread.id}` }}>{thread.id}</Link>
        <Card
          style={{ width: "18vw", height: "150px" }}
          className="bg-dark text-white"
        >
          <Card.Title style={{}}>{thread.id}</Card.Title>
          <Card.Title style={{}}>{thread.subject.substring(0, 20)}</Card.Title>
          <Card.Text>{thread.text.substring(0, 20)}</Card.Text>
        </Card>
        <Posts boardid={thread.board} threadid={thread.id}></Posts>
      </Container>
      <br />
    </div>
  );
};

export default Thread;

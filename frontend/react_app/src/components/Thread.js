import React from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
import { useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useSelector } from "react-redux";
const Thread = (props) => {
  const params = useParams();
  const history = useHistory();
  const thread = useSelector((state) => {
    return state.appstate.threadData.find(
      (e) => e.id === params.threadid || props.thread.id
    );
  });
  // console.log(thread);
  return (
    <div>
      <Container>
        <Link to={thread.id}>{thread.id}</Link>
        <Card
          style={{ width: "18vw", height: "150px" }}
          className="bg-dark text-white"
        >
          <Card.ImgOverlay style={{}}>
            <Card.Title style={{}}>{thread.id}</Card.Title>
            <Card.Title style={{}}>
              {thread.subject.substring(0, 20)}
            </Card.Title>
            <Card.Text>{thread.text.substring(0, 20)}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </Container>
      <br />
    </div>
  );
};

export default Thread;

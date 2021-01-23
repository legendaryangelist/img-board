import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Posts from "./Posts";
import { useSelector } from "react-redux";
const Board = (props) => {
  const { boards } = props;
  const history = useHistory();
  const postsData = useSelector((state) => {
    return state.appstate.postArr;
  });
  const postSearch = useSelector((state) => {
    return state.appstate.postSearch;
  });
  return (
    <div>
      <Container>
        <Row>
          <Card
            style={{ width: "100%", height: "200px" }}
            className="bg-dark text-white"
          >
            <Card.Img
              style={
                {
                  // width: "200px",
                  // height: "200px",
                  // display: "block",
                  // marginLeft: "auto",
                  // marginRight: "auto",
                  // width: "50%",
                }
              }
              src=""
              alt="Card image"
            />
            <Card.ImgOverlay style={{}}>
              <Card.Title style={{}}>{boards.title}</Card.Title>
              <Card.Text>{boards.description}</Card.Text>

              <Button
                className="commentBu"
                onClick={() => history.push(`/boardpost/${boards.id}/0`)}
              >
                add comment
              </Button>
            </Card.ImgOverlay>
          </Card>
          <Posts boardid={boards.id} />
        </Row>
      </Container>
      <br />
    </div>
  );
};
const redux = (dispatch) => bindActionCreators({}, dispatch);
export default connect(null, redux)(Board);

import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Comments from "./Comments";
import { useSelector } from "react-redux";
const Forum = (props) => {
  const { forums } = props;
  const history = useHistory();
  const commentsData = useSelector((state) => {
    return state.appstate.commentArr;
  });
  const commentSearch = useSelector((state) => {
    return state.appstate.commentSearch;
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
              <Card.Title style={{}}>{forums.title}</Card.Title>
              <Card.Text>{forums.description}</Card.Text>

              <Button
                className="commentBu"
                onClick={() => history.push(`/forumcomment/${forums.id}/0`)}
              >
                add comment
              </Button>
            </Card.ImgOverlay>
          </Card>
          <Comments forumid={forums.id} />
        </Row>
      </Container>
      <br />
    </div>
  );
};
const redux = (dispatch) => bindActionCreators({}, dispatch);
export default connect(null, redux)(Forum);

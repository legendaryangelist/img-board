import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Card, Button, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Comments from "./comments";
import { useSelector } from "react-redux";
const Forum = (props) => {
  const { forums } = props;
  const history = useHistory();
  const commentsData = useSelector((state) => {
    return state.commentArr;
  });
  const commentSearch = useSelector((state) => {
    return state.commentSearch;
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
              style={{
                width: "200px",
                height: "200px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%",
              }}
              src=""
              alt="Card image"
            />
            <Card.ImgOverlay style={{}}>
              <Card.Title style={{}}>{forums.titel}</Card.Title>
              <Card.Text>{forums.discripsn}</Card.Text>

              <Button
                className="commentBu"
                onClick={() => history.push(`/fromcomment/${forums.id}/0`)}
              >
                add comment
              </Button>
            </Card.ImgOverlay>
          </Card>
          <Comments
            history={history}
            commentsData={commentsData.filter((e) => e.forumid === forums.id)}
            commentSearch={commentSearch}
          />
        </Row>
      </Container>
      <br />
    </div>
  );
};
const redux = (dispatch) => bindActionCreators({}, dispatch);
export default connect(null, redux)(Forum);

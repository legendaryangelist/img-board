import React from "react";
import { Card, Button, Row } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { addToFavorites, deletePost } from "../../store/appActions";
import { useHistory } from "react-router";

const Post = (props) => {
  const { posts, onAddToFavorites, onDeletePost } = props;
  const history = useHistory();
  const postsData = useSelector((state) => {
    return state.appstate.postsData;
  });

  return (
    <>
      <Row>
        <Card
          style={{
            width: "18rem",
            backgroundColor: "#D8D8D8",
            margin: "10px 10px 10px 10px",
          }}>

          <Card.Body>
            <Card.Title>{posts.creator}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {posts.id}
            </Card.Subtitle>

            <Button className="postButton" onClick={() => history.push(`/board-form/${posts.boardid}/${posts.id}`)}>
              Edit
            </Button>

            <Button className="postButton" onClick={() => onDeletePost(posts.id)}>
              Delete
            </Button>

            <Button className="postButton" onClick={() => onAddToFavorites(posts.id)}>
              Favorite
            </Button>

          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
const redux = (dispatch) =>
  bindActionCreators(
    {
      onAddToFavorites: addToFavorites,
      onDeletePost: deletePost,
    },
    dispatch
  );
export default connect(null, redux)(Post);

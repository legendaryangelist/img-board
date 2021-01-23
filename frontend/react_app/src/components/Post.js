import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToFavorites, deletePost } from "../store/appActions";
import { useHistory } from "react-router";
const Post = (props) => {
  const { posts, onaddToFavorites, ondeletePost } = props;
  const history = useHistory();
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
          <Card.Title>{posts.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {posts.nickname}
          </Card.Subtitle>
          <Card.Text>{posts.text}</Card.Text>
          <Button
            className="postBu"
            onClick={() =>
              history.push(`/boardpost/${posts.boardid}/${posts.id}`)
            }
          >
            edit
          </Button>
          <Button className="postBu" onClick={() => ondeletePost(posts.id)}>
            delit
          </Button>
          <Button className="postBu" onClick={() => onaddToFavorites(posts.id)}>
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
      onaddToFavorites: addToFavorites,
      ondeletePost: deletePost,
    },
    dispatch
  );
export default connect(null, redux)(Post);

import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToFavorites, deleteComment } from "../store/appActions";
import { useHistory } from "react-router";
const Comment = (props) => {
  const { comment, onaddToFavorites, ondeleteComment } = props;
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
          <Card.Title>{comment.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {comment.nickname}
          </Card.Subtitle>
          <Card.Text>{comment.text}</Card.Text>
          <Button
            className="commentBu"
            onClick={() =>
              history.push(`/forumcomment/${comment.forumid}/${comment.id}`)
            }
          >
            edit
          </Button>
          <Button
            className="commentBu"
            onClick={() => ondeleteComment(comment.id)}
          >
            delit
          </Button>
          <Button
            className="commentBu"
            onClick={() => onaddToFavorites(comment.id)}
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
      onaddToFavorites: addToFavorites,
      ondeleteComment: deleteComment,
    },
    dispatch
  );
export default connect(null, redux)(Comment);

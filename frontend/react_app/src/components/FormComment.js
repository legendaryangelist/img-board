import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { addComments, editComment } from "../store/appActions";
import { useHistory, useParams } from "react-router-dom";
const FromComment = (props) => {
  const { onAddComments, editComment } = props;
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [nickname, setnickname] = useState("");
  const commentArr = useSelector((state) => {
    return state.appstate.commentArr;
  });
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (+params.commentid > 0) {
      const filteredComment = commentArr.find(
        (e) => e.id === +params.commentid
      );
      if (filteredComment) {
        settitle(filteredComment.title);
        settext(filteredComment.text);
        setnickname(filteredComment.nickname);
      }
    }
  }, [params]);

  const buttonfun = () => {
    if (+params.commentid > 0) {
      editComment({
        title,
        text,
        nickname,
        forumid: +params.forumsid,
        id: +params.commentid,
      });
    } else {
      onAddComments({ title, text, nickname, forumid: +params.forumsid });
    }

    history.push("/forums");
  };
  return (
    <>
      <Form.Group>
        <Form.Control
          className="InpTextForm1"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          size="lg"
          type="text"
          placeholder="title"
          style={{
            backgroundColor: "#D8D8D8",
            color: "black",
            width: "1000px",
            marginLeft: "450px",
          }}
        />
        <br />
        <Form.Control
          className="InpTextForm1"
          value={text}
          size="xl"
          onChange={(e) => settext(e.target.value)}
          type="text"
          placeholder=" text"
          style={{
            backgroundColor: "#D8D8D8",
            color: "black",
            width: "1000px",
            marginLeft: "450px",
            height: "300px",
          }}
        />
        <br />
        <Form.Control
          className="InpTextForm1"
          value={nickname}
          onChange={(e) => setnickname(e.target.value)}
          size="sm"
          type="text"
          placeholder=" nickname"
          style={{
            backgroundColor: "#D8D8D8",
            color: "black",
            width: "1000px",
            marginLeft: "450px",
          }}
        />
        <Button onClick={() => buttonfun()}>send</Button>
      </Form.Group>
    </>
  );
};

const redux = (dispatch) =>
  bindActionCreators(
    {
      onAddComments: addComments,
      editComment: editComment,
    },
    dispatch
  );
export default connect(null, redux)(FromComment);

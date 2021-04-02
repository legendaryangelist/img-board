import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { addPosts, editPost } from "../store/appActions";
import { useHistory, useParams } from "react-router-dom";


const PostForm = (props) => {
  const { onAddPosts, editPost } = props;

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [nickname, setnickname] = useState("");

  const postData = useSelector((state) => {
    return state.appstate.postData;
  });
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    if (+params.postid > 0) {
      const filteredpost = postData.find((e) => e.id === +params.postid);
      if (filteredpost) {
        setTitle(filteredpost.title);
        setText(filteredpost.text);
        setnickname(filteredpost.nickname);
      }
    }
  }, [params, postData]);

  const buttonFunc = () => {
    if (+params.postid > 0) {
      editPost({
        title,
        text,
        nickname,
        forumid: +params.boardid,
        id: +params.postid,
      });
    } else {
      onAddPosts({ title, text, nickname, boardid: +params.boardid });
    }

    // history.push("/forums");
  };
  return (
    <>
      <Form.Group>
        <Form.Control
          className="InpTextForm1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="lg"
          type="text"
          placeholder="Title"
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
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Text"
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
        <Button onClick={() => buttonFunc()}>
          Send
        </Button>
      </Form.Group>
    </>
  );
};

const redux = (dispatch) =>
  bindActionCreators(
    {
      onAddPosts: addPosts,
      editPost: editPost,
    },
    dispatch
  );
export default connect(null, redux)(PostForm);

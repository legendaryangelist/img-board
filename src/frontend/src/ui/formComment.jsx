import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { addComments, editComment } from "../store/actions";
import { useParams } from "react-router-dom";
const FromComment = (props) => {
  const { onAddComments, history, editComment } = props;
  const [titel, settitel] = useState("");
  const [text, settext] = useState("");
  const [nikname, setnikname] = useState("");
  const commentsData = useSelector((state) => {
    return state.commentArr;
  });

  const params = useParams();

  useEffect(() => {
    if (+params.commentid > 0) {
      const filterdComeent = commentsData.find(
        (e) => e.id === +params.commentid
      );
      if (filterdComeent) {
        settitel(filterdComeent.titel);
        settext(filterdComeent.text);
        setnikname(filterdComeent.nikname);
      }
    }
  }, [params]);

  const buttonfun = () => {
    if (+params.commentid > 0) {
      editComment({
        titel,
        text,
        nikname,
        forumid: +params.forumsid,
        id: +params.commentid,
      });
    } else {
      onAddComments({ titel, text, nikname, forumid: +params.forumsid });
    }

    history.push("/furoms");
  };
  return (
    <>
      <Form.Group>
        <Form.Control
          className="InpTextForm1"
          value={titel}
          onChange={(e) => settitel(e.target.value)}
          size="lg"
          type="text"
          placeholder="titel"
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
          value={nikname}
          onChange={(e) => setnikname(e.target.value)}
          size="sm"
          type="text"
          placeholder=" nikname"
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

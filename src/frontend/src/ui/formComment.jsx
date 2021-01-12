import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addComments } from "../stor/actions";

const FromComment = (props) => {
  const { onAddComments, history } = props;
  const [titel, settitel] = useState("");
  const [text, settext] = useState("");
  const [nikname, setnikname] = useState("");
  const buttonfun = () => {
    onAddComments({ titel, text, nikname });
    history.push("/commets");
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
    },
    dispatch
  );
export default connect(null, redux)(FromComment);

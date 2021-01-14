import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addForum } from "../store/actions";
const FromFurom = (props) => {
  const { history, addForum } = props;
  const [titel, settitel] = useState("");
  const [discripsn, setdiscripsn] = useState("");
  const buttonfun = () => {
    addForum({ titel, discripsn });
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
          value={discripsn}
          size="xl"
          onChange={(e) => setdiscripsn(e.target.value)}
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
        <Form.File id="exampleFormControlFile1" />
        <Button className="commentBu" onClick={() => buttonfun()}>
          send
        </Button>
      </Form.Group>
    </>
  );
};
const redux = (dispatch) =>
  bindActionCreators(
    {
      addForum: addForum,
    },
    dispatch
  );
export default connect(null, redux)(FromFurom);

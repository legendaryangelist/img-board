import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addBoard } from "../store/appActions";
import { useHistory } from "react-router-dom";
const ThreadForm = (props) => {
  const {} = props;
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const history = useHistory();
  const buttonfun = () => {
    history.push("/boards");
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
          value={description}
          size="xl"
          onChange={(e) => setdescription(e.target.value)}
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
const redux = (dispatch) => bindActionCreators({}, dispatch);
export default connect(null, redux)(ThreadForm);

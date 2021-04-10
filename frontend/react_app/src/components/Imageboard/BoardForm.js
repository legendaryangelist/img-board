import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { addBoard } from "../../store/actions/app/appActions";
import { postBoardData } from "../../store/actions/app/appBoardActions";


const BoardForm = (props) => {
  const { addBoard } = props;
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const buttonFunc = () => {
    postBoardData({ title, description })(dispatch);
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
          value={description}
          size="xl"
          onChange={(e) => setdescription(e.target.value)}
          type="text"
          placeholder=" Text"
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
        <Button className="SendButton" onClick={() => buttonFunc()}>
          Send
        </Button>
      </Form.Group>
    </>
  );
};
const redux = (dispatch) =>
  bindActionCreators(
    {
      addBoard: addBoard,
    },
    dispatch
  );
export default connect(null, redux)(BoardForm);

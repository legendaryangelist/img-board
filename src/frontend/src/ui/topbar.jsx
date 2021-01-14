import React from "react";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { MdForum } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchComment, seacrhFurom } from "../store/actions";
import Midbar from "./midbar";
const TopNavBar = (props) => {
  const { Comments, history, searchComment, value, seacrhFurom } = props;

  seacrhFurom(value);
  searchComment(value);

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Midbar />

        <Navbar.Brand href="#home">Grop name</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="" onClick={() => history.push("/")}>
            <AiFillHome />
          </Nav.Link>
          <Nav.Link href={""} onClick={() => history.push("/commets")}>
            <BiComment />
          </Nav.Link>
          <Nav.Link href="" onClick={() => history.push("/fivorits")}>
            <MdFavorite />
          </Nav.Link>
          <Nav.Link href="" onClick={() => history.push("/furoms")}>
            <MdForum />
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            value={value}
            onChange={(e) => {
              seacrhFurom(e.target.value);
              searchComment(e.target.value);
            }}
            className="InpTextForm1"
            type="text"
            placeholder="Search"
            className="mr-md-4"
            style={{ backgroundColor: "##B0B0B0" }}
          />
        </Form>
      </Navbar>
    </>
  );
};
const redux = (dispatch) =>
  bindActionCreators(
    {
      searchComment: searchComment,
      seacrhFurom: seacrhFurom,
    },
    dispatch
  );
export default connect(null, redux)(TopNavBar);

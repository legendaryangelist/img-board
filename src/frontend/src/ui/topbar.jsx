import React from "react";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { MdForum } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchComment, searchForum } from "../store/actions";
import Midbar from "./midbar";
const TopNavBar = (props) => {
  const { Comments, history, searchComment, value, searchForum } = props;

  searchForum(value);
  searchComment(value);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" style={{ height: 80}} collapseOnSelect >
        <Midbar/>
        <Navbar.Brand href="#home">Group name</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="" onClick={() => history.push("/")}>
            <AiFillHome />
          </Nav.Link>
          <Nav.Link href={""} onClick={() => history.push("/comments")}>
            <BiComment />
          </Nav.Link>
          <Nav.Link href="" onClick={() => history.push("/favorites")}>
            <MdFavorite />
          </Nav.Link>
          <Nav.Link href="" onClick={() => history.push("/forums")}>
            <MdForum />
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            value={value}
            onChange={(e) => {
              searchForum(e.target.value);
              searchComment(e.target.value);
            }}
            className="InpTextForm1"
            type="text"
            placeholder="Search"
            className="mr-md-4"
            style={{ backgroundColor: "#F2F2F2" }}
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
      searchForum: searchForum,
    },
    dispatch
  );
export default connect(null, redux)(TopNavBar);

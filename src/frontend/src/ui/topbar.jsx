import React from "react";
import { Navbar, Form, Button, Nav, FormControl } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { MdForum } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchComment } from "../stor/actions";
const TopNavBar = (props) => {
  const { Comments, history, searchComment, value } = props;

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Group name</Navbar.Brand>
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
          <Nav.Link href="" onClick={() => history.push("/fivorits")}>
            <MdForum />
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            value={value}
            onChange={(e) => searchComment(e.target.value)}
            className="InpTextForm1"
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            style={{ backgroundColor: "##B0B0B0" }}
          />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </>
  );
};
const redux = (dispatch) =>
  bindActionCreators(
    {
      searchComment: searchComment,
    },
    dispatch
  );
export default connect(null, redux)(TopNavBar);

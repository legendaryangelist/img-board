import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const BotBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom" style={{ height: 50 }} collapseOnSelect >
      <Navbar.Collapse id="basic-navbar-nav"> 
        <Navbar.Brand href="#home">Group name</Navbar.Brand>
        <Nav.Link href="#pricing">About us</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default BotBar;

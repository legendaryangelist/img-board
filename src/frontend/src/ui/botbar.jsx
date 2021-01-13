import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const BotBar = () => {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Group name</Navbar.Brand>
        <Nav.Link href="#pricing">About us</Nav.Link>
      </Navbar>
    </div>
  );
};
export default BotBar;

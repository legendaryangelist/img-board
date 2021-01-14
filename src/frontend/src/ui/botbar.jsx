import React from "react";
import { Navbar, Nav } from "react-bootstrap";
const BotBar = () => {
  return (
    <div
      style={{
        position: "relative",

        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">forom name</Navbar.Brand>
        <Nav.Link href="#pricing">abuot us</Nav.Link>
      </Navbar>
    </div>
  );
};
export default BotBar;

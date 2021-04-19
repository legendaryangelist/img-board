import React from "react";
import TopBar from "./TopBar";
import Topbar from "./Navbar";
import Footer from "./Footer";
import { Divider } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Row, Col } from "react-bootstrap";

function Layout(props) {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container fluid className='vert-align'>
            <Row><Col><TopBar {...props} /></Col></Row>
            <Row><Col><div>{props.children}</div></Col></Row>
            <Divider style={{ marginTop: "25px" }}/>
            <Row><Col><Footer /></Col></Row>
            <Divider style={{ marginTop: "25px" }}/>
        </Container>
    </React.Fragment>
  );
}

export default Layout;

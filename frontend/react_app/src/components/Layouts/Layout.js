import React from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Row, Col } from "react-bootstrap";

function Layout(props) {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container fluid className='vert-align'>
            <Row><Col><TopBar {...props} /></Col></Row>
            <Row><Col><div>{props.children}</div></Col></Row>
            <Row><Col><Footer /></Col></Row>
        </Container>
    </React.Fragment>
  );
}

export default Layout;

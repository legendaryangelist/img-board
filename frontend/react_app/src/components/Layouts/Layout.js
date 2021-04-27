import React from "react";
import TopBar from "./TopBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./Footer";


function Layout(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <div id="scrollableDiv" style={{ marginTop: "53px", height: '95vh', overflowY: "scroll", overflowX: "hidden" }}> 
        <Container fluid className='vert-align'>
            <Row><Col><TopBar {...props} /></Col></Row>
            <Row><Col><div>{props.children}</div></Col></Row> 
            <Row><Col><Footer /></Col></Row>          
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Layout;

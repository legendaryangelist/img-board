import React, { useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";

const Loader = (props) => {
    
    let marginTop = props.marginTop ? props.marginTop : "60px";

    return (
        <Container fluid>  
        <Row className="justify-content-md-center" style={{ marginTop: {marginTop} }}>  
          <Col md="auto">
            <ReactLoading type="spin" color="#DCDCDC" />
          </Col>           
        </Row> 
      </Container>
    );
};


export default Loader;
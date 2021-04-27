import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from "react-bootstrap";


const useStyles = makeStyles((theme) => ({
  dividerTop: {
    marginTop: "55px"
  },
  dividerBottom: {
    marginTop: "25px"
  },
}));


function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Container fluid className='vert-align'>
        <div className={classes.dividerTop}/>
          <Row className="justify-content-md-center">
            <Col md="auto">
                <img
                  src={process.env.PUBLIC_URL + "rein.jpg"}
                  alt="rein"
                  height="400"
                />
            </Col>
          </Row>
        <div className={classes.dividerBottom}/>
    </Container>

    </React.Fragment>
  );
}

export default Home;

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  text: {
    color: 'inherit',
  },
  link: {
    color: 'inherit',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Container fluid className='vert-align'>
        <Divider style={{ marginTop: "25px" }}/>
        <Row>
          <Col>

            <Typography variant="body2" align="center" className={classes.text}>
              {'Copyright © '}
              <Link href="https://github.com/garyb9/Shatter" className={classes.link}>
                Shadder
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>

          </Col>
        </Row>
        <Divider style={{ marginTop: "25px" }}/>
    </Container>
  );
}

export default Footer
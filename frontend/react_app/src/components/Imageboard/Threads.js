import React, { useEffect } from "react";
import Thread from "./Thread";
import { Container, Row, Col } from "react-bootstrap";
import ImageboardCard from "../Layouts/Card"
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { getThreadsDispatch } from "../../store/actions/app/appThreadActions";
import { Grid, makeStyles } from "@material-ui/core";
import Loader from '../Utils/Loader';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2px",
  },
  gridContainer: {
    // paddingLeft: '40px',
    // paddingRight: '40px',
  },
}));


const Threads = (props) => {
  let currCount = 0;
  const getLimit = 25;
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const { boardid } = props;
  const layout = useSelector((state) => { return state.app.layout; });
  const [loaderPadding, setLoaderPadding] = React.useState(true);
  const isLoading = useSelector((state) => { return state.app.loading;});
  const threads = useSelector((state) => { return state.app.threads;});

  useEffect(() => {
    let threadObj = {'limit': getLimit};
    if(boardid) threadObj['boardid'] = boardid;
    
    getThreadsDispatch(threadObj)(dispatch); // async GET from server

    // loader timer padding
    const timer = setTimeout(() => {    
      setLoaderPadding(false);    
    }, 1500);
    
    return (() => clearTimeout(timer));
  }, [boardid, dispatch]);

  return (
    <div>
        {(threads && !isLoading && !loaderPadding) 
        ? layout === 'grid' ?
        <div className={classes.root}>
          <Grid 
            container 
            spacing={4} 
            className={classes.gridContainer}
          >
            {Object.entries(threads).map(([key, value]) => {
              return (
                <Grid item xs={12} sm={2} md={3}>
                  <ImageboardCard key={key} {...value} width={400} height={300}/>
                </Grid>
              );
            })} 
          </Grid>
        </div>
        :
        <Container fluid>
          {Object.entries(threads).map(([key, value]) => {
            return (
              <Row key={key} className="justify-content-md-center">
                <Col md="auto">
                  <div style={{ marginTop: "2px" }}/>
                  <ImageboardCard key={key} {...value} width={625} rowMargin="50px" />
                </Col>             
              </Row>
            );
          })} 
        </Container> 
        :
        <div id="loaderDiv" style={{ marginTop: '60px' }}>
          <Loader/>
        </div>
        }
    </div>
  );
};

const mapStateToProps = (state) => { 
  return {
    threads: state.threads,
  }
};

export default connect(mapStateToProps, null)(Threads);

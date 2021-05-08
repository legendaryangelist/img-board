import React, { useEffect } from "react";
import Thread from "./Thread";
import { Container, Row, Col } from "react-bootstrap";
import ImageboardCard from "../Layouts/Card"
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { getThreadsDispatch } from "../../store/actions/app/appThreadActions";
import { Grid, makeStyles } from "@material-ui/core";
import Loader from '../Utils/Loader';
import axios from "axios";
import * as settings from "../../settings";

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [threadsObj, setThreadsObj] = React.useState({});


  const fetchData = (options={}) => {
    setIsLoading(true);
    let getURI = `${settings.API_SERVER}/api/app/threads/?limit=${getLimit}`;
    let board_id = boardid ? boardid : null;
    // let offset = ('offset' in options) ? options.offset : null; 
    
    // getURI = (board_id) ? 
    //   getURI.concat(`boards/${board_id}/threads/?limit=${getLimit}`) :
    //   getURI.concat(`threads/?limit=${getLimit}`);
  
    // if (offset) getURI = getURI.concat(`&offset=${offset}`);
  
    axios.get(getURI)
    .then((res) => {
      let threads = {};
      const results = res.data.results;
      if (Array.isArray(results)){
        results.map((thread) => threads[thread.id] = thread);       
      }
      setThreadsObj(threads);
    })
    .catch((err) => {
      console.log(err);     
    });
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchData();

    // loader timer padding
    const timer = setTimeout(() => {    
      setLoaderPadding(false);    
    }, 1000);
    
    return (() => clearTimeout(timer));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
        {(threadsObj && !isLoading && !loaderPadding) 
        ? layout === 'grid' ?
        <div className={classes.root}>
          <Grid 
            container 
            spacing={4} 
            className={classes.gridContainer}
          >
            {Object.entries(threadsObj).map(([key, value]) => {
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
          {Object.entries(threadsObj).map(([key, value]) => {
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

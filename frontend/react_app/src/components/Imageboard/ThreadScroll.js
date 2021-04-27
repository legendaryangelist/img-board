import React, { useEffect } from "react";
import Thread from "./Thread";
import { Container, Row, Col } from "react-bootstrap";
import ImageboardCard from "../Layouts/Card"
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { getThreadsDispatch } from "../../store/actions/app/appThreadActions";
import Loader from '../Utils/Loader';
import axios from "axios";
import * as settings from "../../settings";


const Threads = (props) => {
  let currCount = 0;
  const getLimit = 25;
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { boardid } = props;

  const [loaderPadding, setLoaderPadding] = React.useState(true);
  const isLoading = useSelector((state) => { return state.app.loading;});
  const threads = useSelector((state) => { return state.app.threads;});


  const fetchData = () => {
    // dispatch(actions.startLoading());
    let getURI = `${settings.API_SERVER}/api/app/threads/?limit=${getLimit}`;
    // let board_id = boardid ? boardid : null;
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
      // dispatch(getThreadsAction(threads));
    })
    .catch((err) => {
      console.log(err);
      // dispatch(actions.appFail(err));
    });
    // dispatch(actions.stopLoading());
  };


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
        ? <Container fluid> 
          {Object.entries(threads).map(([key, value]) => {
            return (
              <Row key={key} className="justify-content-md-center">
                <Col md="auto">
                  <div style={{ marginTop: "2px" }}/>
                  <ImageboardCard key={key} {...value}/>
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
    threads: state.threads
  }
};

export default connect(mapStateToProps, null)(Threads);

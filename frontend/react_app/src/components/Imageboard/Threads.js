import React, { useEffect } from "react";
import Thread from "./Thread";
import { Container, Row, Col } from "react-bootstrap";
import ImageboardCard from "../Layouts/Card"
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import { getThreadsDispatch, getThreads } from "../../store/actions/app/appThreadActions";
import Loader from '../Utils/Loader';


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
      <div id="scrollableDiv" style={{ marginTop: "53px", height: '95vh', overflowY: "scroll", overflowX: "hidden" }}> 
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
        <div style={{ marginTop: '60px' }}>
          <Loader/>
        </div>
        }
      </div>           
    </div>
  );
};

const mapStateToProps = (state) => { 
  return {
    threads: state.threads
  }
};

export default connect(mapStateToProps, null)(Threads);

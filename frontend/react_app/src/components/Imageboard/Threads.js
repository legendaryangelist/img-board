import React, { useEffect } from "react";
import Thread from "./Thread";
import { Button, Container, Row, Col } from "react-bootstrap";
import ImageboardCard from "../Layouts/Card"
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import {startLoading } from "../../store/actions/app/appActions"
import { getThreads } from "../../store/actions/app/appThreadActions";
import ReactLoading from "react-loading";


const Threads = (props) => {
  const getLimit = 100;
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { boardid } = props;

  const isLoading = useSelector((state) => { return state.app.loading;});
  const threads = useSelector((state) => { return state.app.threads;});

  
  useEffect(() => {
    let threadObj = {'limit': getLimit};
    if(boardid) threadObj['boardid'] = boardid;
    
    dispatch(startLoading());
    getThreads(threadObj)(dispatch); 
  }, [boardid, dispatch]);


  return (
    <div>
      {(threads && !isLoading) 
      ? Object.entries(threads).map(([key, value]) => {
        return (
          <Row key={key} className="justify-content-md-center">
            <Col md="auto">
              <ImageboardCard key={key} {...value}/>
            </Col>             
          </Row>
        );
      })
      : <Row className="justify-content-md-center">
          <Col md="auto">
            <ReactLoading type="spin" color="#9932CC" />
          </Col>             
        </Row>   
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

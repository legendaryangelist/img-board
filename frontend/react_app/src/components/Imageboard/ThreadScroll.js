import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageboardCard from "../Layouts/Card"
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getThreads } from "../../store/actions/app/appThreadActions";
import Loader from "../Utils/Loader";
import Divider from '@material-ui/core/Divider';
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from 'react-infinite-scroller';
import axios from "axios";
import * as settings from "../../settings";

const Threads = (props) => {
  let currCount = 0;
  const getLimit = 25;
  const dispatch = useDispatch();
  
  let [hasMore, setHasMore] = React.useState(true);
  let [lenData, setLenData] = React.useState(0);
  let [countData, setCountData] = React.useState(0);
  let [threadsData, setThreadsData] = React.useState({});
  const [loaderPadding, setLoaderPadding] = React.useState(true);

  useEffect(() => {
    // loader timer padding
    const timer = setTimeout(() => {    
        setLoaderPadding(false);    
    }, 1500);
    
    return (() => clearTimeout(timer));
  }, );

  const handleFetchMoreData = (event) => {
    let getURI = `${settings.API_SERVER}/api/app/threads/?limit=${getLimit}&offset=${getLimit}`;
  
    axios.get(getURI)
    .then((res) => {
      const count = res.data.count;
      setCountData(count);

      const results = res.data.results;
      if (Array.isArray(results)){
        setLenData(lenData + results.length);
        results.map((thread) => threadsData[thread.id] = thread);       
      }
      setThreadsData(threadsData);

      if (lenData < countData){
        setHasMore(true);
      }
      else{
        setHasMore(false);
      }
        
      console.log(threadsData);
    })
    .catch((err) => {
      console.log(err);
    }); 
  };

  return (
    <div>     
        <Divider light style={{ marginTop: "52px" }}/>  
        <div id="scrollableDiv" style={{ height: '95vh', overflowY: "scroll", overflowX: "hidden" }}>
        {!loaderPadding ?
          <InfiniteScroll
            pageStart={0}
            loadMore={handleFetchMoreData}
            hasMore={hasMore}
            loader={<Loader key={0}/>}
          >
            {Object.entries(threadsData).map(([key, value]) => {
                return (
                <Row key={key} className="justify-content-md-center">
                  <Col md="auto">
                    <Divider light style={{ marginTop: "1px" }}/>
                    <ImageboardCard key={key} {...value}/>
                  </Col>             
                </Row>
                );
            })}
          </InfiniteScroll>
          :
          <Loader/>
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

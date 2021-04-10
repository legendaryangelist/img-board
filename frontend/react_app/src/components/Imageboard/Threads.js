import React, { useEffect } from "react";
import Thread from "./Thread";
import { Button, Container, Row } from "react-bootstrap";
import ImageboardCard from "../Layouts/Card"
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, Link, useParams } from "react-router-dom";
import {startLoading } from "../../store/actions/app/appActions"
import { getThreads } from "../../store/actions/app/appThreadActions";


const Threads = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { boardid } = props;

  const isLoading = useSelector((state) => { return state.app.loading;});
  const threads = useSelector((state) => { return state.app.threads;});

  // const [loading, setLoading] = React.useState(true);
  
  useEffect(() => { 
    dispatch(startLoading());
    getThreads({'limit': 25})(dispatch); 
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  else{
    return (
      <div>
        <Row>
          { threads && !isLoading 
            ? console.log(threads) 
            : console.log("loading")  // TODO: add react-bones
          }
          {/* {Object.entries(threads).map(([key, value]) => {
                console.log(key, value);
            })} */}
          <ImageboardCard/>
          {/* {threadSearch.length === 0
            ? threadData.slice(0, params.all ? threadData.length : 4).map((e) => {
                return (
                  <span key={e.id}>
                    <Link
                      to={{ pathname: `thread/${e.id}`, state: { thread: e } }}
                    >
                      {e.title}
                    </Link>
                    <Thread thread={e} />
                  </span>
                );
              })
            : threadSearch.map((e) => <span key={e.id}>I AM NOT HERE</span>)} */}
          {"   "}
        </Row>
      </div>
    );
  }
  
};

const mapStateToProps = (state) => { 
  return {
    threads: state.threads
  }
};

export default connect(mapStateToProps, null)(Threads);

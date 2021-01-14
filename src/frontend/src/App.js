import React from "react";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import TopNavBar from "./ui/topbar";
import Comments from "./ui/comments";
import FromComment from "./ui/formComment";
import BotBar from "./ui/botbar";
import Favorites from "./ui/favorites";
import Forums from "./ui/forums";
import FromFurom from "./ui/formForum";
import Forum from "./ui/forum";

import "../static/css/App.css";
import rein from "../static/images/rein.jpg";

function App() {
  const commentsData = useSelector((state) => {
    return state.commentArr;
  });
  const commentSearch = useSelector((state) => {
    return state.commentSearch;
  });
  const furomData = useSelector((state) => {
    return state.furomData;
  });
  const forumsearch = useSelector((state) => {
    return state.forumsearch;
  });
  console.log(forumsearch);
  const params = useParams();
  const history = useHistory();
  return (
    <div className="App">
      <TopNavBar history={history} Comments={Comments} />
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/fromcomment/:forumsid/:commentid">
          <FromComment history={history}></FromComment>
        </Route>

        <Route path="/commets" exact>
          <Comments
            commentSearch={commentSearch}
            history={history}
            commentsData={commentsData}
          />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/forums">
          <Forums
            forumsearch={forumsearch}
            history={history}
            furomData={furomData}
          />
        </Route>
        <Route path="/editForum">
          <FromFurom history={history} />
        </Route>
        <Route path="/Forum/:forumid">
          <Forum
            commentSearch={commentSearch}
            params={params}
            commentsData={commentsData}
            history={history}
          />
        </Route>
      </Switch>
      <BotBar></BotBar>
    </div>
  );
}
const Home = () => {
  return (
    <div style={{}}>
      <h1>Hammer Down!</h1>
      <img src={rein} alt="rein" />
    </div>
  );
};
export default App;

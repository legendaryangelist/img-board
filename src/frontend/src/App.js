import React from "react";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import TopNavBar from "./ui/topbar";
import Comments from "./ui/comments";
import FromComment from "./ui/formComment";
import { useSelector } from "react-redux";
import BotBar from "./ui/botbar";
import Fivorits from "./pages/fivorits";
import "./App.css";
import Forums from "../src/ui/forums";
import FromFurom from "./ui/formFurom";
import Forum from "./ui/forum";

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
  const furomSearch = useSelector((state) => {
    return state.furomSearch;
  });
  console.log(furomSearch);
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
        <Route path="/fivorits">
          <Fivorits />
        </Route>
        <Route path="/furoms">
          <Forums
            furomSearch={furomSearch}
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
      <h1>logo</h1>
    </div>
  );
};
export default App;

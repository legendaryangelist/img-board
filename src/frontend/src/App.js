import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import TopNavBar from "./ui/topbar";
import Comments from "./ui/comments";
import FromComment from "./ui/formComment";
import { useSelector } from "react-redux";
import BotBar from "./ui/botbar";
import Favourites from "./pages/favourites";
import "./App.css";

function App() {
  const commentsData = useSelector((state) => {
    console.log(state);
    return state.commentArr;
  });

  const history = useHistory();
  return (
    <div className="App">
      <TopNavBar history={history} Comments={Comments} />
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/fromcomment/:id">
          <FromComment history={history}></FromComment>
        </Route>

        <Route path="/commets" exact>
          <Comments history={history} commentsData={commentsData} />
        </Route>
        <Route path="/favourites">
          <Favourites />
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

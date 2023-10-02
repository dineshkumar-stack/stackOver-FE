import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import ask from "../pages/AskQuestion";
import tag from "../pages/Tag";
import UserDetailPage from "../pages/UserDetailPage"
import LoginPage from "../pages/LoginPage"


function Content() {

  return (
    <div className="content">
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/ask" component={ask} />
        <Route path="/userdetail" component={UserDetailPage} />
        <Route path="/tag" component={tag} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </div>
  );
}


export default Content;

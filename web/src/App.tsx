import React from "react";
import { Community } from "./features/community/Community";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import { Account } from "./features/auth/Account";
import { Communities } from "./features/community/Communities";
import { CreateCommunity } from "./features/community/CreateCommunity";
import { CreatePost } from "./features/post/CreatePost";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/create-community" component={CreateCommunity} exact />
          <Route path="/c/:communityName" component={Community} exact />
          <Route path="/c/:communityName/submit" component={CreatePost} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/c" component={Communities} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/account" component={Account} exact />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;

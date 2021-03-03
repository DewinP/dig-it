import React from "react";
import { Community } from "./features/community/Community";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./features/user/Login";
import { Register } from "./features/user/Register";
import { Account } from "./features/user/Account";
import { Communities } from "./features/community/Communities";
import { CreateCommunity } from "./features/community/CreateCommunity";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/create-community" component={CreateCommunity} exact />
          <Route path="/c/:communityName" component={Community} />
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
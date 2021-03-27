import React, { useEffect, useState } from "react";
import { Community } from "./features/community/Community";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./features/user/Login";
import { Register } from "./features/user/Register";
import { Account } from "./features/user/Account";
import { Communities } from "./features/community/Communities";
import { CreateCommunity } from "./features/community/CreateCommunity";
import { CreatePost } from "./features/post/CreatePost";
import { Post } from "./features/post/Post";
import { Profile } from "./features/user/Profile";
import { useAppSelector } from "./app/hooks";
import { selectCurrentUser } from "./app/services/auth.slice";
import { useMeQuery } from "./app/services/api";
import { LoadingLogo } from "./components/LoadingLogo";

type ProtectedRouteProps = { userId: string } & RouteProps;

function ProtectedRoute({ userId, ...routeProps }: ProtectedRouteProps) {
  if (userId) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to="/login" />;
  }
}

function App() {
  useMeQuery();
  let { user, isFetching } = useAppSelector(selectCurrentUser);
  const [showLogoSpinner, setShowLogoSpinner] = useState(true);
  setTimeout(() => setShowLogoSpinner(false), 2000);
  if (isFetching || showLogoSpinner) {
    return <LoadingLogo />;
  } else
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/create-community" component={CreateCommunity} exact />
            <Route path="/c" component={Communities} exact />
            <Route path="/c/:communityName" component={Community} exact />
            <Route
              path="/c/:communityName/submit"
              component={CreatePost}
              exact
            />
            <Route path="/c/:communityName/:postTitle" component={Post} exact />
            <Route path="/c/:communityName/:postTitle" component={Post} exact />
            <Route path="/u/:username" component={Profile} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <ProtectedRoute
              userId={user.id}
              path="/account"
              component={Account}
              exact
            />
          </Switch>
        </Layout>
      </Router>
    );
}

export default App;

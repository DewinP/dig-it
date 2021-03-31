import React, { useState } from "react";
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
import { AccountSettings } from "./features/user/AccountSettings";
import { Communities } from "./features/community/Communities";
import { CreateCommunity } from "./features/community/CreateCommunity";
import { CreatePost } from "./features/post/CreatePost";
import { PostPage } from "./features/post/PostPage";
import { Profile } from "./features/user/Profile";
import { useAppSelector } from "./app/hooks";
import { selectCurrentUser } from "./app/services/auth.slice";
import { useMeQuery } from "./app/services/api";
import { LoadingLogo } from "./components/LoadingLogo";
import { Home } from "./features/user/Home";

function ProtectedRoute({ ...routeProps }: RouteProps) {
  let { isLoggedIn } = useAppSelector(selectCurrentUser);
  if (isLoggedIn) {
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
        <Switch>
          {/* Private routes */}
          <ProtectedRoute
            path="/create-community"
            component={CreateCommunity}
            exact
          />
          <ProtectedRoute
            path="/c/:communityName/submit"
            component={CreatePost}
            exact
          />
          <ProtectedRoute path="/account" component={AccountSettings} exact />
          {/* Public routes */}
          <Route path="/" component={Home} exact />
          <Route path="/c" component={Communities} exact />
          <Route path="/c/:communityName" component={Community} exact />
          <Route path="/c/:communityName/:postTitle" component={PostPage} />
          <Route path="/u/:username" component={Profile} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
        </Switch>
      </Router>
    );
}

export default App;

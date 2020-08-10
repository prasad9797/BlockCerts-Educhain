import React from "react";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./Pages/Admin";
import Cert from "./test/CertTest";
import Devs from "./Pages/developers";
import PrivateRoute from "./common/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/cert" component={Cert} />
        <Route exact path="/dev" component={Devs} />
        <Switch>
          <PrivateRoute exact path="/admin" component={Admin} />
        </Switch>
      </Switch>
    </Router>
  );
}

export default App;

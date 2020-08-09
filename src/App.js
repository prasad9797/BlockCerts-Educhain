import React from 'react';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './Component/Admin';
import Cert from './test/CertTest';
import Devs from './Component/developers';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/cert" component={Cert} />
        <Route exact path="/dev" component={Devs} />
      </Switch>
    </Router>
  );
}

export default App;

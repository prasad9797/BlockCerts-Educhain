import React from 'react';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './Component/Admin';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path='/admin' component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;

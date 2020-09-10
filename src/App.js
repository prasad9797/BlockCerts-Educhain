import React from "react";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPass from "./Pages/ForgetPass";
import Cert from "./test/CertTest";
import Devs from "./Pages/developers";
import StudentDashboard from "./Component/StudentDashboard";
import CertificateDisplay from "./Component/CertificatePage";
import Admin_SVGUpload from "./Pages/Admin_svg";
import Admin_CSVUpload from "./Pages/Admin_csv";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FooterComp from "./Component/footer";
import Verification from "./Pages/verification";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Register} />
        <Route exact path='/forgetpassword' component={ForgetPass} />
        <Route exact path='/forgetpassword/verify' component={Verification} />
        <Route exact path='/cert' component={Cert} />
        <Route exact path='/dev' component={Devs} />
        <Route exact path='/admin/upload/svg' component={Admin_SVGUpload} />
        <Route exact path='/admin/upload/csv' component={Admin_CSVUpload} />
        <Route exact path='/student/dashboard' component={StudentDashboard} />
        <Route
          exact
          path='/student/certificate/:id'
          component={CertificateDisplay}
        />
        {/* <Switch>
          <PrivateRoute exact path="/admin" component={Admin} />
        </Switch> */}
      </Switch>
      <FooterComp />
    </Router>
  );
}

export default App;

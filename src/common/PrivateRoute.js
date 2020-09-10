import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isloggedin, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isloggedin === true ? <Component {...props} /> : <Redirect to='/' />
    }
  />
);

PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.isAdmin,
});

export default connect(mapStateToProps)(PrivateRoute);

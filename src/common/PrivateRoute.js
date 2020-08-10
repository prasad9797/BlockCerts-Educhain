import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAdmin === true ? <Component {...props} /> : <Redirect to="/login" />
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

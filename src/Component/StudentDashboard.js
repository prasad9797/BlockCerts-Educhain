import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Col,
  Row,
  Dropdown,
} from "react-bootstrap";
import image from "../images/cert.svg";
import "../CSS/s_dashboard.css";
import { connect } from "react-redux";
import { LOGOUT } from "../actions/types";
import axios from "axios";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStudent: false,
      username: "",
    };
  }

  componentWillMount() {
    // console.log(this.state.isStudent);
    // console.log(sessionStorage.getItem("jwtToken"));
    if (sessionStorage.getItem("jwtToken") !== "null") {
      var sessionData = sessionStorage.getItem("jwtToken");
      console.log("Session: ", sessionData);
      // var decoded = jwt_decode(sessionData[1]);
      console.log("SessionData: ", sessionData);
      var sessionData = sessionData.split(" ");
      console.log("Split Data: ", sessionData);
      var decoded = jwt_decode(sessionData[1]);
      console.log(decoded);
      // console.log(sessionStorage.getItem("jwtToken"));
      this.setState({ isStudent: true, username: decoded.name });
    } else if (!this.props.isAdmin && this.props.isAuthenticated) {
      this.setState({ isStudent: true });
    } else {
      this.setState({ isStudent: false });
      sessionStorage.removeItem("jwtToken");
      console.log("Logout");
      delete axios.defaults.headers.common["Authorization"];
      this.props.Logout();
      this.props.history.push("/login");
    }
  }

  componentDidMount() {
    console.log(this.state.isStudent);
    console.log(window.location.pathname);
    // console.log(split(window.location.pathname, "/"));
  }

  logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("jwtToken");
    this.props.Logout();
    this.props.history.push("/login");
  };

  render() {
    return this.state.isStudent ? (
      <section id="student_dashboard">
        <div className="custom-nav slide-bottom">
          <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="/">EduChain</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {this.state.username
                      ? this.state.username
                      : this.props.username.name}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button className="sign" onClick={this.logout}>
                        Log Out
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                {/* <h4 className="dashboard-header mt-auto">Welcome, Sujoy Dev</h4> */}
                {/* <Button className="sign" onClick={this.logout}>
                  Log Out
                </Button> */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Container fluid>
          <div className="dashboard">
            <h4 className="dashboard-certificate-text">Your Certificates</h4>
          </div>
          <div className="certificate-holder">
            <Row xs={1} sm={1} md={4} style={{ textAlign: "center" }}>
              <Col>
                <img
                  onClick={() => {
                    this.props.history.push("/student/certificate/1");
                  }}
                  style={{ maxHeight: "300px" }}
                  src={image}
                />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
              <Col>
                <img style={{ maxHeight: "300px" }} src={image} />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
              <Col>
                <img style={{ maxHeight: "300px" }} src={image} />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
              <Col>
                <img style={{ maxHeight: "300px" }} src={image} />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    ) : (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  isAdmin: state.Admin,
  username: state.jwtToken,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);

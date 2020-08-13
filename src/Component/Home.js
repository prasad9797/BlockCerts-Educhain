import React from "react";
import { Container, Row, Col, Button, Nav, Navbar } from "react-bootstrap";
import "../CSS/home.css";
import "../CSS/animation.css";
import FooterComp from "./footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT } from "../actions/types";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  async componentWillMount() {
    if (sessionStorage.getItem("jwtToken") !== "null") {
      // var sessionData = sessionStorage.getItem("jwtToken");
      // var sessionData = sessionData.split(" ");
      // var decoded = jwt_decode(sessionData[1]);
      // console.log("decoded: ", decoded);
      await this.setState({
        isLoggedIn: true,
      });
    } else if (this.props.isAuthenticated) {
      await this.setState({
        isLoggedIn: true,
      });
    }
  }

  logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("jwtToken");
    this.props.Logout();
    window.location.reload();
  };

  render() {
    return (
      <section id="home">
        <div className="custom-nav slide-bottom">
          <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="/">Educhain</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                {this.state.isLoggedIn ? (
                  <Button className="sign" onClick={this.logout}>
                    LogOut
                  </Button>
                ) : (
                  <div>
                    <Button className="sign" href="/login">
                      Log In
                    </Button>
                    <Button className="reg" href="/signup">
                      Sign Up
                    </Button>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Container fluid>
          <Row sm={12} md={1}>
            <Col>
              <div className="center-div">
                <h1
                  align="center"
                  className="title swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                >
                  Secure your{" "}
                  <span className="decorated-text">Certificate</span>
                </h1>
                <p
                  align="center"
                  className="sub-title swing-in-left-fwd"
                  style={{ animationDelay: "0.4s", fontWeight: "500" }}
                >
                  Authenticate your Certificates with Ease!
                </p>
                <p align="center">
                  {this.state.isLoggedIn ? (
                    <Link to="/student/dashboard">
                      <Button
                        className="log swing-in-left-fwd"
                        style={{ animationDelay: "0.6s" }}
                      >
                        View Certificates
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <Button
                        className="log swing-in-left-fwd"
                        style={{ animationDelay: "0.6s" }}
                      >
                        Get Started
                      </Button>
                    </Link>
                  )}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <FooterComp />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

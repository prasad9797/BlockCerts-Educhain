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

class StudentDashboard extends React.Component {
  logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    this.props.Logout();
    this.props.history.push("/login");
  };

  render() {
    return this.props.isAuthenticated ? (
      <section id="student_dashboard">
        <div className="custom-nav slide-bottom">
          <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="/">EduChain</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    Sujoy Dev
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);

import React from "react";
import { Navbar, Nav, Button, Container, Col, Row } from "react-bootstrap";
import image from "../images/cert.svg";
import "../CSS/s_dashboard.css";
import { connect } from "react-redux";
import { LOGOUT } from "../actions/types";
import axios from "axios";

class StudentDashboard extends React.Component {
  logout = () => {
    axios.defaults.headers.common["Authorization"] = "";
    this.props.Logout();
    this.props.history.push("/login");
  };

  render() {
    return (
      <section id="student_dashboard">
        <div className="custom-nav slide-bottom">
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href="/">APSIT Blockchain</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Button className="sign" onClick={this.logout}>
                  Log Out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Container fluid>
          <div className="dashboard">
            <h2 className="dashboard-header">Welcome, Student Name!</h2>
            <h4 className="dashboard-header">Your Certificates</h4>
          </div>
          <div className="certificate-holder">
            <Row xs={1} sm={1} md={4} style={{ textAlign: "center" }}>
              <Col>
                <img style={{ maxHeight: "500px" }} src={image} />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
              <Col>
                <img style={{ maxHeight: "500px" }} src={image} />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
              <Col>
                <img style={{ maxHeight: "500px" }} src={image} />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
              <Col>
                <img style={{ maxHeight: "500px" }} src={image} />
                <h3 style={{ textAlign: "left" }}>Certificate Name</h3>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default connect(null, mapDispatchToProps)(StudentDashboard);

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
      email: "",
    };
  }

  async componentWillMount() {
    if (sessionStorage.getItem("jwtToken") !== "null") {
      var sessionData = sessionStorage.getItem("jwtToken");
      var sessionData = sessionData.split(" ");
      var decoded = jwt_decode(sessionData[1]);
      console.log("decoded: ", decoded);
      await this.setState({
        isStudent: true,
        username: decoded.name,
        email: decoded.useremail,
      });
      console.log(this.state.username);
    } else if (!this.props.isAdmin && this.props.isAuthenticated) {
      this.setState({ isStudent: true });
    } else {
      this.setState({ isStudent: false });
      sessionStorage.removeItem("jwtToken");
      this.props.Logout();
      this.props.history.push("/login");
    }

    console.log("Undef: ", this.state.email);

    axios
      .get(
        `https://blockcerts-dapp.herokuapp.com/api/v1/protected/${this.state.email}`
      )
      .then((res) => {
        console.log("API call: ", res.data);
      });
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
                    this.props.history.push(
                      "/student/certificate/c45dffe204ad0bac1352874e8a71b22c"
                    );
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

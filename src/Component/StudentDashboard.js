import React from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Col,
  Row,
  Dropdown,
  Card,
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
      svg: [],
      cert: [],
      isLoading: true,
    };
  }

  async componentWillMount() {
    this.setState({ isLoading: true });
    if (sessionStorage.getItem("jwtToken") !== "null") {
      axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
        "jwtToken"
      );
      var sessionData = sessionStorage.getItem("jwtToken");
      var sessionData = sessionData.split(" ");
      var decoded = jwt_decode(sessionData[1]);
      //console.log("decoded: ", decoded);
      await this.setState({
        isStudent: true,
        username: decoded.name,
        email: decoded.useremail,
      });
      //console.log(this.state.username);
    } else if (!this.props.isAdmin && this.props.isAuthenticated) {
      this.setState({ isStudent: true });
    } else {
      this.setState({ isStudent: false });
      sessionStorage.removeItem("jwtToken");
      this.props.Logout();
      this.props.history.push("/login");
    }

    await axios
      .get(
        `https://blockcerts-dapp.herokuapp.com/api/v1/protected/${this.state.email}`
      )
      .then(async (res) => {
        //console.log("API call: ", res.data.data);
        //console.log("Data fetched...");
        await this.setState({ cert: res.data.data, isLoading: false });
        //console.log(this.state.cert);
      })
      .catch((err) => {
        //console.log(err);
      });
    // await this.state.cert.map((i, ii) => {
    // for (var j = 0; j < this.state.cert.length; j++) {
    //   var k = await axios.get(
    //     `http://educhain.apsit.edu.in/api/v1/public/samplesvg/${this.state.cert[j].svg}`
    //   );
    //   var l = this.state.svg;
    //   l.push(k.data.data);
    //   await this.setState({ svg: l });
    //   // await //console.log(this.state.svg.length);
    // }
    // console.log(i);
    // var k = axios.get(
    //   `http://educhain.apsit.edu.in/api/v1/public/samplesvg/${i.svg}`
    // );
    // console.log(k);
    //
    // });

    //console.log("Undef: ", this.state.email);
  }

  logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("jwtToken");
    this.props.Logout();
    this.props.history.push("/login");
  };

  render() {
    const parse = require("html-react-parser");
    return this.state.isStudent ? (
      <section id="student_dashboard">
        <div className="custom-nav slide-bottom">
          <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              EduChain
            </Navbar.Brand>
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
            {this.state.isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <div>
                {this.state.cert.length === 0 ? (
                  <h1>No Certificates</h1>
                ) : (
                  // <div>
                  <Row
                    style={{ textAlign: "center" }}
                    className="align-items-center"
                  >
                    {this.state.cert.map((certs, index) => (
                      <Col sm={12} md={3} key={index}>
                        <div
                          className="cert-holder"
                          key={index}
                          onClick={() => {
                            this.props.history.push(
                              `/student/certificate/${certs.id}`
                            );
                          }}
                        >
                          {/* {parse(
                              this.state.svg[index] ? this.state.svg[index] : ""
                            )} */}
                          <img
                            className="cert-card"
                            src="https://educhain.apsit.edu.in/api/static/media/1.svg"
                            alt="Cert_Thumb"
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                  // </div>
                )}
              </div>
            )}
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

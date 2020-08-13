import React from "react";
import { Nav, Navbar, Button, Card, Col, Row } from "react-bootstrap";
import "../CSS/admin.css";
import "../CSS/animation.css";
import axios from "axios";
import folder from "../images/unnamed.png";
import { CSVReader } from "react-papaparse";
import FooterComp from "../Component/footer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LOGOUT } from "../actions/types";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: "",
      csv: {},
      certAvailable: false,
      isAllowedToView: false,
      isSendingData: false,
      error: "",
    };
  }

  async componentWillMount() {
    console.log(this.state.isAllowedToView);
    if (sessionStorage.getItem("jwtToken") !== "null") {
      console.log(sessionStorage.getItem("jwtToken"));
      console.log("Session Accessed Before", this.state.isAllowedToView);
      await this.setState({ isAllowedToView: true });
      console.log("Session Accessed After", this.state.isAllowedToView);
    } else if (this.props.isAdmin) {
      console.log("Else Accessed", this.state.isAllowedToView);
      this.setState({ isAllowedToView: true });
    } else {
      this.setState({ isAllowedToView: false });
      sessionStorage.removeItem("jwtToken");
      console.log("Logout");
      delete axios.defaults.headers.common["Authorization"];
      this.props.Logout();
      this.props.history.push("/login");
    }
  }
  componentDidMount() {
    //Call get route to fetch Certificate Thumbnail
    // axios.get('fetchTemplateRoute').then(function (response) {
    //     console.log(response);
    //      this.setState({cert: true})
    // })
    console.log(this.state.isAllowedToView);
  }

  handleFile = async (e) => {
    // console.log([e.target.name] + ":" + e.target.value);
    await this.setState({
      [e.target.name]: e.target.files[0].name,
    });
    console.log(this.state.svg);
  };

  submit = () => {
    this.setState({ isSendingData: false });
    if (this.state.svg === "" || this.state.csv === {}) {
      this.setState({ error: "Please upload both files" });
      return;
    } else {
      this.setState({ isSendingData: true });
      //Send data to server
      axios
        .post(
          "https://blockcerts-dapp.herokuapp.com/api/v1/protected/addCerts",
          {
            svg: this.state.svg,
            cert: this.state.csv,
          }
        )
        .then((res) => {
          console.log(res.data);
          this.setState({ isSendingData: false });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            isSendingData: false,
            error: "Error sending...Please try again!",
          });
        });
    }
  };

  logout = () => {
    this.setState({ isAllowedToView: false });
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("state");
    this.props.Logout();
    this.props.history.push("/login");
  };

  render() {
    return this.state.isAllowedToView ? (
      <section id="admin">
        <div className="custom-nav slide-bottom">
          <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="/">Educhain</Navbar.Brand>
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
        <div className="admin-dashboard" align="center">
          <h3 className="admin-title swing-in-left-fwd">Admin Dashboard</h3>
          <Row
            xs={1}
            sm={1}
            md={2}
            lg={2}
            className="justify-content-md-center"
          >
            <Col>
              <Card style={{ width: "60%" }} className="swing-in-left-fwd">
                {this.state.svg ? (
                  <div>
                    <object data={this.state.svg} type="image/svg+xml" />
                  </div>
                ) : (
                  <Card.Img className="mx-auto" variant="top" src={folder} />
                )}
                <Card.Body>
                  <Card.Title className="upload-cert-template">
                    Upload Certificate Template
                  </Card.Title>
                </Card.Body>
                <input
                  type="file"
                  name="svg"
                  id="svg"
                  className="fileInput"
                  accept=".svg"
                  onChange={this.handleFile}
                  style={{ color: "black", align: "center" }}
                />
              </Card>
            </Col>
            <Col>
              <Card
                style={{ width: "60%", animationDelay: ".2s" }}
                className="swing-in-left-fwd"
              >
                <Card.Img className=" mx-auto" variant="top" src={folder} />
                <Card.Body>
                  <Card.Title className="upload-cert-template">
                    Upload Certificate Data
                  </Card.Title>
                </Card.Body>
                <CSVReader
                  type=".csv"
                  noDrag
                  onDrop={(data) => {
                    var dataTemp = [];
                    for (var i = 0; i < data.length; i++) {
                      if (
                        data[i]["data"]["certID"] !== "" &&
                        data[i]["data"]["name"]
                      ) {
                        dataTemp.push(data[i]);
                      }
                      delete data[i]["errors"];
                      delete data[i]["meta"];
                    }
                    console.log("Data : ", dataTemp);
                    this.setState({
                      csv: dataTemp,
                    });
                    console.log("State Updated : ", this.state.csv);
                  }}
                  config={{ header: true }}
                  onError={this.handleOnError}
                  style={{ padding: "0" }}
                  addRemoveButton
                  onRemoveFile={this.handleOnRemoveFile}
                >
                  <span style={{ color: "black" }}>
                    {" "}
                    Click to upload (CSV only)
                  </span>
                </CSVReader>
              </Card>
            </Col>
          </Row>
          <p align="center" className="error">
            {this.state.error}
          </p>
          {this.state.isSendingData ? (
            <Loader
              type="ThreeDots"
              color="white"
              height={60}
              width={60}
              style={{ backgroundColor: "transparent" }}
            />
          ) : (
            <Button
              variant="primary"
              className="swing-in-left-fwd"
              style={{ animationDelay: "0.4s" }}
              onClick={this.submit}
            >
              Upload Data
            </Button>
          )}
        </div>
        <FooterComp />
      </section>
    ) : (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  isAdmin: state.Admin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

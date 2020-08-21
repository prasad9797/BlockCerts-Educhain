import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Navbar, Button, Nav, Row, Col } from "react-bootstrap";
import folder from "../images/unnamed.png";
import { LOGOUT, UPLOAD_CSV } from "../actions/types";
import Footer from "../Component/footer";
import "../CSS/admin_csv.css";
import { CSVReader } from "react-papaparse";

class Admin_SVGUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      csv: null,
      isAllowedToView: false,
      isCSVUploaded: false,
    };
  }

  async componentWillMount() {
    console.log(sessionStorage.getItem("jwtToken"));
    if (sessionStorage.getItem("jwtToken") !== "null") {
      axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
        "jwtToken"
      );
      await this.setState({ isAllowedToView: true });
    } else if (this.props.isAdmin) {
      this.setState({ isAllowedToView: true });
    } else {
      this.setState({ isAllowedToView: false });
      sessionStorage.removeItem("jwtToken");
      delete axios.defaults.headers.common["Authorization"];
      this.logout();
      this.props.history.push("/login");
    }
  }

  updateSVG() {
    console.log(this.state.csv[0].data["student-name"]);
    var keys = Object.keys(this.state.csv[0].data);
    console.log(keys);
    var displaySVG = document.getElementById("SVG");
    var SVG = displaySVG.contentDocument;
    console.log(SVG);
    console.log(SVG.getElementById("student-name").textContent);
    var keys = Object.keys(this.state.csv[0].data);
    console.log("Keys:", keys);
    for (var i = 0; i < keys.length; i++) {
      if (document.getElementById(keys[i]) !== null) {
        console.log("Done: ", keys[i]);
        document.getElementById(keys[i]).textContent = this.state.csv[i].data[
          keys[i]
        ];
      }
    }
  }

  // handleFile = (e) => {
  //   this.setState({ csv: e.target.value, isCSVUploaded: true });
  //   console.log(this.state.csv[0].name);
  // };

  logout = () => {
    this.setState({ isAllowedToView: false });
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("state");
    this.props.Logout();
    this.props.history.push("/login");
  };

  render() {
    return this.state.isAllowedToView ? (
      <section id="csv-upload">
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
        <div className="cardTemplate">
          <Row md={4} className="justify-content-center align-items-center">
            <Col sm={12} md={12} lg={6}>
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
                        data[i]["data"]["student-name"]
                      ) {
                        dataTemp.push(data[i]);
                      }
                      delete data[i]["errors"];
                      delete data[i]["meta"];
                    }
                    console.log("Data : ", dataTemp);
                    this.setState({
                      csv: dataTemp,
                      isCSVUploaded: true,
                    });
                    console.log("StateCSV: ", this.state.csv);
                    this.props.SaveCSV(this.state.csv); //console.log("State Updated : ", this.state.csv);
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
                {this.state.isCSVUploaded ? (
                  <Button
                    align="center"
                    variant="primary"
                    className="swing-in-left-fwd "
                    style={{ animationDelay: "0.4s", marginTop: "20px" }}
                  >
                    Next
                  </Button>
                ) : null}
              </Card>
            </Col>
            <Col>
              <h5 align="center">Preview</h5>
              <object id="SVG" data={this.props.svg} type="image/svg+xml" />
              <Button
                align="center"
                variant="primary"
                className="swing-in-left-fwd "
                style={{ animationDelay: "0.4s", marginTop: "20px" }}
                onClick={() => this.updateSVG()}
              >
                Preview
              </Button>
            </Col>
          </Row>
        </div>
        <Footer />
      </section>
    ) : (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  isAdmin: state.Admin,
  svg: state.svg,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
    SaveCSV: (csvData) => {
      dispatch({ type: UPLOAD_CSV, csvPayload: csvData });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin_SVGUpload);

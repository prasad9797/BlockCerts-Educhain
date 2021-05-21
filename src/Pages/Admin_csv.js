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
      svg: null,
      errors: "",
    };
  }

  async componentWillMount() {
    const Data = this.props.location;
    console.log(sessionStorage.getItem("jwtToken"));
    if (sessionStorage.getItem("jwtToken") !== "null") {
      axios.defaults.headers.common["Authorization"] =
        sessionStorage.getItem("jwtToken");
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
    console.log(Data.SVGN);
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}api/static/media/${this.props.svgName}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ svg: URL.createObjectURL(res.data) });
      });
    // this.setState({
    //   svg: `${process.env.REACT_APP_BACKEND_URL}api/static/media/${this.props.match.params.svg}`,
    // });
  }

  updateSVG() {
    console.log(this.state.csv);
    // console.log(this.state.csv[0].data["student-name"]);
    var keys = Object.keys(this.state.csv[0].data);
    console.log(keys);
    var displaySVG = document.getElementById("SVG");
    var SVG = displaySVG.contentDocument;
    console.log(SVG);
    // console.log(SVG.getElementById("student-name").textContent);
    var keys = Object.keys(this.state.csv[0].data);
    console.log("Keys:", keys);

    // for (var i = 0; i < keys.length; i++) {
    //   if (document.getElementById(keys[i]) !== null) {
    //     document.getElementById(keys[i]).textContent = this.state.csv[i].data[
    //       keys[i]
    //     ];
    //   }
    // }
    for (var i = 0; i < keys.length; i++) {
      if (SVG.getElementById(keys[i]) !== null) {
        console.log("Done: ", keys[i]);
        SVG.getElementById(keys[i]).textContent =
          this.state.csv[1].data[keys[i]];
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

  onSend = () => {
    console.log(this.props.svgName);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}api/v1/protected/addCerts`, {
        cert: this.state.csv,
        svg: this.props.svgName,
      })
      .then((res) => {
        console.log(res.data.message);
        document.getElementById("msgResponse").innerHTML = res.data.message;
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          errors: err.message,
        });
      });
  };

  render() {
    const parse = require("html-react-parser");

    return this.state.isAllowedToView ? (
      <div>
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
              <Col sm={12} md={12} lg={6} className="centerCol">
                <Card
                  style={{ animationDelay: ".2s" }}
                  className="swing-in-left-fwd"
                >
                  <Card.Img className=" mx-auto" variant="top" src={folder} />
                  <Card.Body>
                    <Card.Title className="upload-cert-template">
                      Upload Certificate Data
                    </Card.Title>
                  </Card.Body>
                  <CSVReader
                    style="width: 23px, height: 23px;"
                    type=".csv"
                    noDrag
                    onDrop={(data) => {
                      console.log(data);
                      console.log(data[0]["data"]["Student_copy"]);
                      var dataTemp = [];
                      for (var i = 0; i < data.length; i++) {
                        // if (
                        //data[i]["data"]["cert_id"] !== "" &&
                        //  data[i]["data"]["Student_copy"];
                        // ) {
                        data[i]["data"]["slug"] = this.props.svgSlug;
                        dataTemp.push(data[i]);
                        // }
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
                    onRemoveFile={() => {
                      this.setState({ isCSVUploaded: false });
                    }}
                  >
                    <span style={{ color: "black" }}>
                      {" "}
                      Click to upload (CSV only)
                    </span>
                  </CSVReader>
                </Card>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <h5 align="center"> {this.props.match.params.slug} </h5>
                <div className="svgPrev">
                  {/* {parse(this.state.svg ? this.state.svg : "")} */}
                </div>
                <object id="SVG" data={this.state.svg} type="image/svg+xml" />
              </Col>
            </Row>

            {this.state.isCSVUploaded ? (
              <React.Fragment>
                <Button
                  align="center"
                  variant="success"
                  className="swing-in-left-fwd "
                  style={{ animationDelay: "0.4s", marginTop: "20px" }}
                  onClick={() => this.updateSVG()}
                >
                  Preview
                </Button>
                <Button
                  align="center"
                  variant="primary"
                  className="swing-in-left-fwd "
                  style={{ animationDelay: "0.4s", marginTop: "20px" }}
                  onClick={this.onSend}
                >
                  Upload
                </Button>
              </React.Fragment>
            ) : null}
            <p align="center" id="msgResponse"></p>
          </div>
        </section>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  isAdmin: state.Admin,
  svg: state.svg,
  svgName: state.svgName,
  svgSlug: state.svgSlug,
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

import React from "react";
import { Navbar, Nav, Button, Col, Row, Dropdown } from "react-bootstrap";
import "../CSS/certificate_display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import axios from "axios";
import { LOGOUT } from "../actions/types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

class CertificateDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: null,
      svgName: null,
      cert: null,
      username: "",
      id: "",
      txHash: "",
      issuerpk: "",
    };
  }

  async componentWillMount() {
    var id = this.props.match.params.id;
    this.setState({ id: id });
    //console.log(id);
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/v1/public/single/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          cert: res.data.result.data,
          svgName: res.data.svg,
          txHash: res.data.transactionhash,
          issuerpk: res.data.issuerPk,
        });
        ////console.log(this.state.cert);
      });
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/public/svg/${this.state.svgName}`
      )
      .then((res) => {
        this.setState({ svg: res.data.data });
      });

    if (sessionStorage.getItem("jwtToken") !== "null") {
      var sessionData = sessionStorage.getItem("jwtToken");
      var sessionData = sessionData.split(" ");
      var decoded = jwt_decode(sessionData[1]);
      await this.setState({
        username: decoded.name,
      });
      ////console.log(this.state.username);
    } else {
      this.setState({ isStudent: false });
      sessionStorage.removeItem("jwtToken");
      this.props.Logout();
      this.props.history.push("/login");
    }
  }

  logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("jwtToken");
    this.props.Logout();
    this.props.history.push("/login");
  };

  componentDidMount() {
    console.log("Keys:", this.state.cert);
    setTimeout(() => {
      var keys = Object.keys(this.state.cert);
      //console.log("Keys:", keys);
      for (var i = 0; i < keys.length; i++) {
        if (document.getElementById(keys[i]) !== null) {
          document.getElementById(keys[i]).textContent = this.state.cert[
            keys[i]
          ];
        }
      }
    }, 2000);
  }

  render() {
    const parse = require("html-react-parser");
    return (
      <section id="user-certificates">
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
                    {this.state.username}
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
        <div className="certificate">
          <Row className="justify-content-center align-items-center">
            <h1 className="verified">Verified</h1>
            <FontAwesomeIcon
              icon={faCheckSquare}
              size="2x"
              style={{ color: "#5EFC8D", marginLeft: "10px" }}
            />
          </Row>
          <Row className="justify-content-center align-items-center">
            <Col sm={12} lg={6}>
              <div className="cert">
                {parse(this.state.svg ? this.state.svg : "")}
              </div>
            </Col>
            <Col sm={12} lg={4}>
              <h4 className="cert-detail-title">ISSUER</h4>
              <p className="cert-detail-info">APSIT</p>
              <h4 className="cert-detail-title">TXN ID</h4>
              <a
                href={`https://ropsten.etherscan.io/tx/${this.state.txHash}`}
                className="cert-detail-info"
              >
                {this.state.txHash}
              </a>
              {/* <Link to="https://ropsten.etherscan.io/tx/${this.state.txHash}">
                <p>{this.state.txHash}</p>
              </Link> */}
              {/* <Link
                to=`https://ropsten.etherscan.io/tx/${this.state.txnhash}`
                className="cert-detail-info"
              >
                {this.state.issuerpk}
              </Link> */}
            </Col>
          </Row>
          {/* <Button
            onClick={() => {
              document.getElementById("name").textContent = "Tejas Raibagi";
              document.getElementById("certID").textContent =
                "0x6ac3ffdaa18e9c83a914d7c9671bc258e6b8caf35f77dcb705b8cc0fd147ac65";
            }}
          /> */}
        </div>
        <Footer />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.username,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CertificateDisplay)
);

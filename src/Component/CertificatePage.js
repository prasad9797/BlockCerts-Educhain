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
import img from "../images/cert.svg";
import "../CSS/certificate_display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import axios from "axios";

class CertificateDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: null,
      cert: null,
    };
  }

  async componentWillMount() {
    var id = this.props.match.params.id;
    await axios
      .get("https://blockcerts-dapp.herokuapp.com/api/v1/public/samplesvg")
      .then((res) => {
        this.setState({ svg: res.data.data });
      });

    await axios
      .get(`https://blockcerts-dapp.herokuapp.com/api/v1/public/single/${id}`)
      .then((res) => {
        this.setState({ cert: res.data.result });
        console.log(this.state.cert);
      });
  }

  componentDidMount() {
    setTimeout(() => {
      var keys = Object.keys(this.state.cert);
      console.log("Keys:", keys);
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
              <h4 className="cert-detail-title">ISSUE DATE</h4>
              <p className="cert-detail-info">July 18, 2020</p>
              <h4 className="cert-detail-title">ISSUER</h4>
              <p className="cert-detail-info">APSIT</p>
              <h4 className="cert-detail-title">ISSUER's PUBLIC KEY</h4>
              <a
                href="https://ropsten.etherscan.io/tx/0x6ac3ffdaa18e9c83a914d7c9671bc258e6b8caf35f77dcb705b8cc0fd147ac65"
                className="cert-detail-info"
              >
                0x6ac3ffdaa18e9c83a914d7c9671bc258e6b8caf35f77dcb705b8cc0fd147ac65
              </a>
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

export default CertificateDisplay;

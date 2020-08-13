import React from "react";
import { Navbar, Container, Col, Row } from "react-bootstrap";
import "../CSS/devs.css";
import "../CSS/animation.css";

class Devs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="devs">
        <div className="custom-nav slide-bottom">
          <Navbar variant="light">
            <Navbar.Brand
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Educhain
            </Navbar.Brand>
          </Navbar>
        </div>
        <div className="dev-details">
          <Container>
            <Col>
              <Row className="justify-content-md-center">
                <h1 className="dev-title swing-in-left-fwd">Developers</h1>
              </Row>
              <Row
                xs="1"
                sm="2"
                md="3"
                className="justify-content-start dev-name ml-auto"
              >
                <Col className="swing-in-left-fwd">
                  <h3>Tejas Raibagi</h3>
                  <p>FrontEnd Lead</p>
                </Col>
                <Col className="swing-in-left-fwd">
                  <h3>Prasad Jadhav</h3>
                  <p>FrontEnd Developer</p>
                </Col>
                <Col className="swing-in-left-fwd">
                  <h3>Sujoy Dev</h3>
                  <p>BackEnd Lead</p>
                </Col>
                <Col className="swing-in-left-fwd">
                  <h3>Rutwik Gaikwad</h3>
                  <p>Smart Contract Lead</p>
                </Col>
                <Col className="swing-in-left-fwd">
                  <h3>Sanjana Nalawade</h3>
                  <p>Documentation / Research Lead</p>
                </Col>
              </Row>
            </Col>
          </Container>
        </div>
      </section>
    );
  }
}

export default Devs;

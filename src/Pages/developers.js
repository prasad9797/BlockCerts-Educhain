import React from "react";
import { Navbar, Container, Col, Row } from "react-bootstrap";
import "../CSS/devs.css";
import "../CSS/animation.css";

export default function Devs() {
  return (
    <section id="devs">
      <div className="custom-nav slide-bottom">
        <Navbar variant="light">
          <Navbar.Brand href="/">APSIT Blockchain</Navbar.Brand>
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
                <p>FrontEnd Developer</p>
              </Col>
              <Col className="swing-in-left-fwd">
                <h3>Prasad Jadhav</h3>
                <p>FrontEnd Developer</p>
              </Col>
              <Col className="swing-in-left-fwd">
                <h3>Sujoy Dev</h3>
                <p>BackEnd Developer</p>
              </Col>
              <Col className="swing-in-left-fwd">
                <h3>Rutwik Gaikwad</h3>
                <p>Yet to be declared</p>
              </Col>
              <Col className="swing-in-left-fwd">
                <h3>Sanjana Nalawade</h3>
                <p>Yet to be declared</p>
              </Col>
            </Row>
          </Col>
        </Container>
      </div>
    </section>
  );
}

import React from "react";
import { Navbar, Container, Col, Row } from "react-bootstrap";
import "../CSS/devs.css";
import "../CSS/animation.css";

class Devs extends React.Component {
  render() {
    return (
      <div>
        <section id='devs'>
          <div className='custom-nav slide-bottom'>
            <Navbar variant='light'>
              <Navbar.Brand
                onClick={() => {
                  this.props.history.push("/");
                }}
              >
                Educhain
              </Navbar.Brand>
            </Navbar>
          </div>
          <div className='dev-details'>
            <Container fluid>
              <Col>
                <Row className='justify-content-md-center'>
                  <h1 align='center' className='dev-title swing-in-left-fwd'>
                    Developers
                  </h1>
                </Row>
                <Row
                  xs='1'
                  sm='1'
                  md='3'
                  className='justify-content-md-center align-items-center dev-name ml-auto'
                >
                  <Col className='swing-in-left-fwd'>
                    <h3 align='center' className='dev-name'>
                      Tejas Raibagi
                    </h3>
                    <p align='center'>FrontEnd Lead</p>
                  </Col>
                  <Col className='swing-in-left-fwd'>
                    <h3 align='center' className='dev-name'>
                      Sujoy Dev
                    </h3>
                    <p align='center'>BackEnd Lead</p>
                  </Col>
                  {/* <Col className="swing-in-left-fwd">
                  <h3 align="center" className="dev-name">
                    Rutwik Gaikwad
                  </h3>
                  <p align="center">Smart Contract Lead</p>
                </Col> */}
                </Row>
              </Col>
            </Container>
          </div>
        </section>
      </div>
    );
  }
}

export default Devs;

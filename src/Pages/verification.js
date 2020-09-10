import React from "react";
import { Col, Row, Navbar, Form, Button } from "react-bootstrap";

class Verification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  render() {
    return (
      <section id="login">
        <div className="custom-nav slide-bottom">
          <Navbar variant="light">
            <Navbar.Brand href="/">Educhain</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Navbar>
        </div>
        <Row
          xs={12}
          md={3}
          className="justify-content-center align-items-center"
        >
          <Col>
            <h2 className="header-title swing-in-left-fwd" align="center">
              Verify Email
            </h2>
            <Form
              className="login-form login-fields"
              style={{ padding: "20px" }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                  type="number"
                  name="opt"
                  placeholder="Enter OTP"
                  onChange={this.changeHandler}
                />
                <Button
                  variant="primary"
                  className="swing-in-left-fwd"
                  onClick={this.onSubmit}
                  style={{
                    position: "absolute",
                    left: "40%",
                    marginTop: "5%",
                    animationDelay: "0.3s",
                  }}
                >
                  {" "}
                  <a
                    align="center"
                    style={{
                      backgroundColor: "transparent",
                      padding: "0",
                    }}
                  >
                    Verify
                  </a>
                </Button>
                <a
                  align="center"
                  className="error"
                  style={{
                    backgroundColor: "transparent",
                    padding: "0",
                    color: "red",
                  }}
                >
                  {this.state.error}
                </a>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Verification;

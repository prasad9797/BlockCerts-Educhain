import React from "react";
import { Col, Row, Navbar, Form, Button } from "react-bootstrap";
import FooterComp from "../Component/footer";

class ForgetPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      error: null,
    };
  }

  changeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onSubmit = () => {
    if (this.state.email !== null || this.state.email === null) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.email)) {
        this.setState({
          error: "Please enter valid email address",
        });
      } else {
        //axios call to send OTP (pending)
        //Send user to verification page
        this.props.history.push("/forgetpassword/verify");
      }
    }
  };

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
              Forget Password
            </h2>
            <Form
              className="login-form login-fields"
              style={{ padding: "20px" }}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="swing-in-left-fwd">
                  Email address
                </Form.Label>
                <Form.Control
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                  type="email"
                  name="email"
                  placeholder="Enter email"
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
                    Submit
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

export default ForgetPass;

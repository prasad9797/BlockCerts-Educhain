import React from "react";
import { Form, Button, Row, Col, Navbar } from "react-bootstrap";
import FooterComp from "../Component/footer";
import axios from "axios";
import "../CSS/login.css";
import "../CSS/animation.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LOGOUT } from "../actions/types";

class Register extends React.Component {
  state = {
    admin: false,
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    repeat_password: "",
    error: "",
    isLoggedIn: false,
  };

  async componentWillMount() {
    console.log(sessionStorage.getItem("jwtToken"));
    if (sessionStorage.getItem("jwtToken") !== null) {
      axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
        "jwtToken"
      );
      await this.setState({ isLoggedIn: true });
    } else if (this.props.isAdmin) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isAllowedToView: false });
      sessionStorage.removeItem("jwtToken");
      delete axios.defaults.headers.common["Authorization"];
      this.props.Logout();
      this.props.history.push("/login");
    }
  }

  //Set values of each textfield into individual state values.
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  //Check all state values (Not the ideal way.)
  validate() {
    var errorCount = 0;
    if (this.state.email !== "") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.email)) {
        this.setState({
          error: "Please enter valid email address",
        });
      }
      errorCount += 1;
      //console.log("Email");
    }
    if (this.state.firstname === "") {
      this.setState({ error: "Please Enter Name" });
      errorCount += 1;
      //console.log("Fname");
    }
    if (this.state.lastname === "") {
      this.setState({ error: "Please Enter Name" });
      errorCount += 1;
      //console.log("Lname");
    }
    if (this.state.phone === "") {
      this.setState({ error: "Enter Phone Number" });
      errorCount += 1;
      //console.log("Phone");
    }
    if (this.state.phone.length !== 10) {
      this.setState({ error: "Enter a valid Phone Number" });
      errorCount += 1;
      //console.log("PhoneLen");
    }
    if (this.state.password === "") {
      this.setState({ error: "Password field cannot be empty" });
      errorCount += 1;
      //console.log("Pass");
    }
    if (this.state.password === "") {
      this.setState({ error: "Repeat Password field cannot be empty" });
      errorCount += 1;
      //console.log("RePhone");
    }
    if (this.state.password.length < 6) {
      this.setState({ error: "Password must be more than 6 letters" });
      errorCount += 1;
      //console.log("PassNotNull/len");
    }
    if (this.state.password !== this.state.repeat_password) {
      this.setState({ error: "Password does not match" });
      errorCount += 1;
      //console.log("PassMatch");
    }
    if (errorCount > 1) {
      this.setState({ error: "Check all fields again" });
    }
    if (errorCount === 0) {
      this.setState({ error: "" });
    }
  }

  submitHandler = async () => {
    await this.validate();
    let user = {
      email: this.state.email,
      fname: this.state.firstname,
      lname: this.state.lastname,
      phone: this.state.phone,
      password: this.state.password,
    };
    //axios
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}api/v1/auth/register`, user)
      .then((res) => {
        //console.log(res.data);
        this.props.history.push("/login");
      })
      .catch(() => {
        this.setState({
          errors: "Something went wrong",
        });
      });
  };

  componentDidMount() {
    //console.log(this.state.admin);
  }

  render() {
    return this.state.isLoggedIn ? (
      <section id="login">
        <div className="custom-nav slide-bottom">
          <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="/">Educhain</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          </Navbar>
        </div>
        <Row
          xs={1}
          md={3}
          className="justify-content-center align-items-center"
        >
          <Col>
            <h2 className="header-title-reg swing-in-left-fwd" align="center">
              Sign Up
            </h2>
            <Form className="login-form">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="swing-in-left-fwd">
                  Email address
                </Form.Label>
                <Form.Control
                  required
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.changeHandler}
                />
                <Form.Text
                  className="text-muted swing-in-left-fwd"
                  style={{ animationDelay: "0.4s" }}
                >
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPhone">
                <Form.Label className="swing-in-left-fwd">
                  Phone Number
                </Form.Label>
                <Form.Control
                  required
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                  type="number"
                  min="0"
                  placeholder="+91..."
                  name="phone"
                  onChange={this.changeHandler}
                />
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridFname">
                  <Form.Label
                    className="swing-in-left-fwd"
                    style={{ animationDelay: "0.2s" }}
                  >
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="swing-in-left-fwd"
                    style={{ animationDelay: "0.3s" }}
                    placeholder="First Name"
                    name="firstname"
                    onChange={this.changeHandler}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLname">
                  <Form.Label
                    className="swing-in-left-fwd"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    className="swing-in-left-fwd"
                    style={{ animationDelay: "0.3s" }}
                    name="lastname"
                    onChange={this.changeHandler}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formBasicPassword">
                <Form.Label
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                >
                  Password
                </Form.Label>
                <Form.Control
                  required
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.changeHandler}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                >
                  Repeat Password
                </Form.Label>
                <Form.Control
                  className="swing-in-left-fwd"
                  style={{ animationDelay: "0.2s" }}
                  type="password"
                  placeholder="Repeat Password"
                  name="repeat_password"
                  onChange={this.changeHandler}
                />
              </Form.Group>
              {/* <Form.Check
                className="swing-in-left-fwd"
                style={{ animationDelay: "0.2s" }}
                type="switch"
                onChange={async (e) => {
                  await this.setState({
                    admin: !this.state.admin,
                  });
                  //console.log(this.state.admin);
                }}
                checked={this.state.admin}
                id="custom-switch"
                label="Register as Admin (Toggle if Admin)"
              /> */}
              {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
              <a
                href="/login"
                className="already-account swing-in-left-fwd"
                style={{ animationDelay: "0.2s" }}
              >
                Already have an Account?Click here to Sign In!
              </a>
              <p
                align="center"
                className="swing-in-left-fwd"
                style={{
                  animationDelay: "0.2s",
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                {this.state.error}
              </p>
              <p
                align="center"
                className="swing-in-left-fwd"
                style={{ animationDelay: "0.2s" }}
              >
                <Button className="form-button" onClick={this.submitHandler}>
                  Submit
                </Button>
              </p>
            </Form>
          </Col>
        </Row>
        <FooterComp />
      </section>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);

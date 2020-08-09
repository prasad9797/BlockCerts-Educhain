import React from 'react';
import { Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import '../CSS/login.css';
import '../CSS/animation.css';
import FooterComp from '../Component/footer';

class Register extends React.Component {

    // constructor(props) {
    //     super.props;
    //     this.state = {
    //         admin: false
    //     }
    // }

    state = {
        admin: false
    }

    submitHandler = () => {

    }

    componentDidMount() {
        console.log(this.state.admin);
    }

    render() {
        return (
            <section id="login">
                <div className="custom-nav slide-bottom">
                    <Navbar collapseOnSelect expand="lg" variant="light">
                        <Navbar.Brand href="/">APSIT Blockchain</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        {/* <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Button className="sign" href="/signin">Sign In</Button>
                                <Button className="reg">Register</Button>
                            </Nav>
                        </Navbar.Collapse> */}
                    </Navbar>
                </div>
                <Row xs={1} md={3} className="justify-content-center align-items-center">
                    <Col>
                        <h2 className="header-title swing-in-left-fwd" align="center">Sign Up</h2>
                        <Form className="login-form">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="swing-in-left-fwd">Email address</Form.Label>
                                <Form.Control required className="swing-in-left-fwd" style={{ animationDelay: "0.2s" }} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted swing-in-left-fwd" style={{ animationDelay: "0.4s" }}>
                                    We'll never share your email with anyone else.
                        </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="swing-in-left-fwd" style={{ animationDelay: "0.6s" }}>Password</Form.Label>
                                <Form.Control required className="swing-in-left-fwd" style={{ animationDelay: "0.8s" }} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="swing-in-left-fwd" style={{ animationDelay: "1s" }}>Repeat Password</Form.Label>
                                <Form.Control className="swing-in-left-fwd" style={{ animationDelay: "1.2s" }} type="password" placeholder="Repeat Password" />
                            </Form.Group>
                            <Form.Check
                                className="swing-in-left-fwd" style={{ animationDelay: "1.4s" }}
                                type="switch"
                                onChange={async (e) => {
                                    await this.setState({
                                        admin: !this.state.admin,
                                    })
                                    console.log(this.state.admin);
                                }}
                                checked={this.state.admin}
                                id="custom-switch"
                                label="Register as Admin (Toggle if Admin)"
                            />
                            {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <a href="/login" className="already-account swing-in-left-fwd" style={{ animationDelay: "1.4s" }}>Already have an Account?Click here to Sign In!</a>
                            <p align="center" className="swing-in-left-fwd" style={{ animationDelay: "1.6s" }}>
                                <Button className="form-button" type="submit" onClick={this.submitHandler}>
                                    Submit
                        </Button>
                            </p>
                        </Form>
                    </Col>
                </Row>
                <FooterComp />
            </section>
        );
    }
}

export default Register;
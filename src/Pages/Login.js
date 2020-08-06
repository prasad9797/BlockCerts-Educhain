import React from 'react';
import { Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import '../CSS/login.css';
import '../CSS/animation.css';

class Login extends React.Component {
    render() {
        return (
            <section id="login">
                <div className="custom-nav slide-bottom">
                    <Navbar collapseOnSelect expand="lg" variant="light">
                        <Navbar.Brand href="/">APSIT Blockchain</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    </Navbar>
                </div>
                <Row xs={12} md={3} className="justify-content-center align-items-center">
                    <Col>
                        <h2 className="header-title swing-in-left-fwd" align="center">Login</h2>
                        <Form className="login-form">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="swing-in-left-fwd">Email address</Form.Label>
                                <Form.Control className="swing-in-left-fwd" style={{ animationDelay: "0.2s" }} type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted swing-in-left-fwd" style={{ animationDelay: "0.4s" }}>
                                    We'll never share your email with anyone else.
                        </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="swing-in-left-fwd" style={{ animationDelay: "0.6s" }}>Password</Form.Label>
                                <Form.Control className="swing-in-left-fwd" style={{ animationDelay: "0.8s" }} type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Check
                                className="swing-in-left-fwd" style={{ animationDelay: "1s" }}
                                type="switch"
                                id="custom-switch"
                                label="Login as Admin (Toggle if Admin)"
                            />
                            {/* <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group> */}
                            <a href="/register" className="no-account swing-in-left-fwd" style={{ animationDelay: "1s" }}>Don't have an account? Click here to create one!</a>
                            <p align="center" className="swing-in-left-fwd" style={{ animationDelay: "1.2s" }}>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </section>
        );
    }
}

export default Login;
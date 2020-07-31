import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar } from 'react-bootstrap';
import '../CSS/home.css';
import '../CSS/animation.css';

export default function Home() {

    return (
        <section id="home">
            <div className="custom-nav slide-bottom">
                <Navbar collapseOnSelect expand="lg" variant="light">
                    <Navbar.Brand href="/">APSIT Blockchain</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Button className="sign" href="/signin">Sign In</Button>
                            <Button className="reg" href="/register">Register</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <Container fluid>
                <Row sm={12} md={1}>
                    <Col>
                        <h1 align="center" className="title swing-in-left-fwd" style={{ animationDelay: "0.2s" }}>
                            Secure your <span className="decorated-text">Certificate</span></h1>
                        <p align="center" className="sub-title swing-in-left-fwd" style={{ animationDelay: "0.4s" }}>
                            Authenticate your Certificates with Ease!
                        </p>
                        <p align="center">
                            <Button className="log swing-in-left-fwd" style={{ animationDelay: "0.6s" }}>Get Started</Button>
                        </p>
                    </Col>

                </Row>

            </Container>
        </section>
    );
}
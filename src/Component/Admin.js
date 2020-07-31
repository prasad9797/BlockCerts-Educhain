import React from 'react';
import { Nav, Navbar, Button, Card, Col, Row } from 'react-bootstrap';
import '../CSS/admin.css';
import '../CSS/animation.css';
import image from '../images/upload_file.png';


export default function Admin() {
    return (
        <section id="admin">
            <div className="custom-nav slide-bottom">
                <Navbar collapseOnSelect expand="lg" variant="light">
                    <Navbar.Brand href="/">APSIT Blockchain</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Button className="sign" href="/">Log Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div className="admin-dashboard center" align="center">
                <h3 className="admin-title swing-in-left-fwd">Admin Dashboard</h3>
                <Row sm={1} md={2}>
                    <Col>
                        <Card style={{ width: '60%' }} className="swing-in-left-fwd">
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Card.Title className="upload-cert-template">Upload Certificate Template</Card.Title>
                            </Card.Body>
                            <Button variant="primary">Upload Template</Button>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '60%', height: '100%', animationDelay: '.2s' }} className='swing-in-left-fwd'>
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Card.Title className="upload-cert-template">Upload Certificate Data</Card.Title>
                            </Card.Body>
                            <Button variant="primary">Upload Data</Button>
                        </Card>
                    </Col>
                </Row>
                {/* <Button variant="primary" className='swing-in-left-fwd' style={{ animationDelay: '0.4s' }}>Submit</Button> */}
            </div>
        </section >
    );
}
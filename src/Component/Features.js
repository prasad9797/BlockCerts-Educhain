import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../CSS/features.css'

export default function Features() {
    return (
        <section id="features">
            <div>
                <Container fluid>
                    <Col>
                        <Row className="justify-content-center">
                            <h1 className="featureHeader">Features</h1>
                            <h3 className="featurePoints">•	Your certificate gets stored on Highly Decentralized Secured Ethereum Blockchain.</h3>
                            <h3 className="featurePoints">•	Generates certificates in large number and store them on Blockchain with few clicks.</h3>
                        </Row>
                    </Col>
                </Container>
            </div>
        </section>
    );
}
import React from 'react';
import '../CSS/info.css';
import { Container, Col, Row } from 'react-bootstrap';

export default function Info() {
    return (
        <section id="info">
            <div>
                <Container fluid>
                    <Col>
                        <Row className="justify-content-center">
                            <h1 className="introHeader">How Does The Website Work?</h1>
                            <h3 className="introPoints">• Our website utilizes smart contracts to encrypt and issue certificates on the Ethereum Blockchain safely</h3>
                            <h3 className="introPoints">• Students are provided with simple, attractive certificates in their account via a secure and seamless Easy to use SaaS web platform.</h3>
                            <h3 className="introPoints">• They can share these badges with job providers to verify their educational achievements.Job providers can ascertain educational content and authenticate the issued certificates without intervention from the certificate publisher.</h3>
                        </Row>
                    </Col>
                </Container>
            </div>
        </section>
    );
}


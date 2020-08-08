import React from 'react';
import { Nav, Navbar, Button, Card, Col, Row } from 'react-bootstrap';
import '../CSS/admin.css';
import '../CSS/animation.css';
import axios from 'axios';
import folder from '../images/unnamed.png';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            svg: null,
            csv: null,
            certAvailable: false
        }
    }

    // componentDidMount() {
    //     //Call get route to fetch Certificate Thumbnail
    //     axios.get('fetchTemplateRoute').then(function (response) {
    //         console.log(response);
    //          this.setState({cert: true})
    //     })
    // }

    handleFile = async (e) => {
        // console.log([e.target.name] + ":" + e.target.value);
        await this.setState({
            [e.target.name]: e.target.files[0]
        })
        console.log(this.state.svg);
        console.log(this.state.csv);
    }

    // submit() {
    //     const data = new FormData()
    //     data.append('file', this.state.csv);
    //     console.warn(this.state.csv);
    //     let url = "http://localhost:8000/upload.php";

    //     axios.post(url, data, { // receive two parameter endpoint url ,form data 
    //     })
    //         .then(res => { // then print response status
    //             console.warn(res);
    //         })
    // }

    render() {
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
                    <Row xs={1} sm={1} md={2} lg={2} className="justify-content-md-center">
                        <Col>
                            <Card style={{ width: '60%' }} className="swing-in-left-fwd">
                                {this.state.certAvailable ? <div><h3>List will display here</h3> OR </div> : <Card.Img className="mx-auto" variant="top" src={folder} />}
                                <Card.Body>
                                    <Card.Title className="upload-cert-template">Upload Certificate Template</Card.Title>
                                </Card.Body>
                                <input type="file" name="svg" id="svg" className="fileInput" accept=".svg" onChange={this.handleFile} />
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: '60%', animationDelay: '.2s' }} className='swing-in-left-fwd'>
                                <Card.Img className=" mx-auto" variant="top" src={folder} />
                                <Card.Body>
                                    <Card.Title className="upload-cert-template">Upload Certificate Data</Card.Title>
                                </Card.Body>
                                <input type="file" name="csv" id="csv" className="fileInput" accept=".csv" onChange={this.handleFile} />
                            </Card>
                        </Col>
                    </Row>
                    <Button variant="primary" className='swing-in-left-fwd' style={{ animationDelay: '0.4s' }}>Upload Data</Button>
                </div>
            </section >
        );
    }
}

export default Admin;
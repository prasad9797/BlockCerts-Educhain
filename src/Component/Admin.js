import React from 'react';
import { Nav, Navbar, Button, Card, Col, Row } from 'react-bootstrap';
import '../CSS/admin.css';
import '../CSS/animation.css';
import axios from 'axios';
import folder from '../images/unnamed.png';
import { CSVReader } from "react-papaparse";

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            svg: "",
            csv: {},
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

    submit = () => {
        //Send data to server
        axios.post('https://blockcerts-dapp.herokuapp.com/api/v1/protected/addCerts',
            {
                svg: this.state.svg,
                cert: this.state.csv
            }
        ).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

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
                                <CSVReader
                                    onDrop={(data) => {
                                        for (var i = 0; i < data.length; i++) {
                                            delete data[i]["errors"];
                                            delete data[i]["meta"];
                                        }
                                        console.log("Data : ", data);
                                        this.setState({
                                            csv: data
                                        })
                                        console.log("State Updated : ", this.state.csv);
                                    }}
                                    config={{ header: true }}
                                    onError={this.handleOnError}
                                    style={{ padding: '0' }}
                                    addRemoveButton
                                    onRemoveFile={this.handleOnRemoveFile}
                                >
                                    <span style={{ color: 'white' }}>Drop CSV file here or click to upload.</span>
                                </CSVReader>
                            </Card>
                        </Col>
                    </Row>
                    <Button variant="primary" className='swing-in-left-fwd' style={{ animationDelay: '0.4s' }} onClick={this.submit}>Upload Data</Button>
                </div>
            </section >
        );
    }
}

export default Admin;
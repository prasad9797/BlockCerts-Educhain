import React from 'react';
import { Form, Button, Row, Col, Navbar } from 'react-bootstrap';
import '../CSS/login.css';
import '../CSS/animation.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: "",
            isAdmin: false,
            errors: "",
            isValid: false
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    isAdmin = () => {
        this.setState({
            isAdmin: !this.state.isAdmin
        })
    }

    async validate() {
        await this.setState({
            error: ""
        })
        let isValid = true;

        // if (this.state.email !== null) {
        //     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        //     if (!pattern.test(this.state.email)) {
        //         isValid = false;
        //         this.setState({
        //             errors: "Please enter valid email address"
        //         })
        //     }
        // }
        if (this.state.password === "") {
            isValid = false;
            this.setState({
                errors: "Please enter password"
            })
        }
        this.setState({
            isValid: isValid
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await this.validate();
        if (this.state.isValid) {
            console.log("validated")
            if (this.state.isAdmin) {
                //Call Admin route
                let auth = {
                    username: this.state.email,
                    password: this.state.password
                }
                console.log(this.state.isAdmin);
                axios.post('https://blockcerts-dapp.herokuapp.com/api/v1/auth',
                    auth
                ).then((res) => {
                    console.log(res.data);
                    axios.defaults.headers.common['Authorization'] = res.data.data;
                    this.props.history.push("/admin");
                }).catch(() => {
                    this.setState({
                        errors: "Incorrect Email or Password"
                    })
                })
            }
            else {
                //Call User route
                this.setState({
                    errors: "User Route not yet assigned.."
                })
            }
        }
    }

    render() {
        return (
            <section id="login">
                <div className="custom-nav slide-bottom">
                    <Navbar variant="light">
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
                                <Form.Control className="swing-in-left-fwd" style={{ animationDelay: "0.2s" }} type="email" name="email" placeholder="Enter email" onChange={this.changeHandler} error={this.state.errors.email} />
                                <Form.Text className="text-muted swing-in-left-fwd" style={{ animationDelay: "0.4s" }}>
                                    We'll never share your email with anyone else.
                        </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="swing-in-left-fwd" style={{ animationDelay: "0.6s" }}>Password</Form.Label>
                                <Form.Control className="swing-in-left-fwd" style={{ animationDelay: "0.8s" }} name="password" type="password" placeholder="Password" onChange={this.changeHandler} />
                            </Form.Group>
                            <Form.Check
                                className="swing-in-left-fwd" style={{ animationDelay: "1s" }}
                                type="switch"
                                id="custom-switch"
                                label="Login as Admin (Toggle if Admin)"
                                name="isAdmin"
                                onChange={this.isAdmin}
                            />
                            <a href="/signup" className="no-account swing-in-left-fwd" style={{ animationDelay: "1s" }}>Don't have an account? Click here to create one!</a>
                            <p align="center" className="error">{this.state.errors}</p>
                            <p align="center" className="swing-in-left-fwd" style={{ animationDelay: "1.2s" }}>
                                <Button variant="primary" onClick={this.onSubmit}>
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
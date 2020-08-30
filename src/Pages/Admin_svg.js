import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Navbar, Button, Nav, Row, Col, Form } from "react-bootstrap";
import folder from "../images/unnamed.png";
import { LOGOUT, UPLOAD_SVG } from "../actions/types";
import Footer from "../Component/footer";
import "../CSS/admin_svg.css";

class Admin_SVGUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: null,
      svgName: null,
      isAllowedToView: false,
      isSvgUploaded: false,
      slug: null,
      error: "",
      svgList: [],
    };
  }

  async componentWillMount() {
    console.log(sessionStorage.getItem("jwtToken"));
    if (sessionStorage.getItem("jwtToken") !== "null") {
      axios.defaults.headers.common["Authorization"] = sessionStorage.getItem(
        "jwtToken"
      );
      await this.setState({ isAllowedToView: true });
    } else if (this.props.isAdmin) {
      this.setState({ isAllowedToView: true });
    } else {
      this.setState({ isAllowedToView: false });
      sessionStorage.removeItem("jwtToken");
      delete axios.defaults.headers.common["Authorization"];
      this.logout();
      this.props.history.push("/login");
    }
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/v1/protected/uploadedSVG`)
      .then((res) => {
        console.log(res.data);
        this.setState({ svgList: res.data.data });
      });
  }

  changeHandler = (e) => {
    this.setState({ slug: e.target.value });
  };

  handleFile = (e) => {
    this.setState({ svg: e.target.files[0], isSvgUploaded: true });
    console.log(e.target.files[0]);
  };

  SVGSave = () => {
    if (this.state.slug === null) {
      // this.props.history.push("/admin/upload/csv");
      this.setState({ error: "Please enter file slug" });
    } else {
      const crypto = require("crypto");
      var randomString = crypto.randomBytes(8).toString("hex");
      var fileName = this.state.svg.name;
      var fileName = randomString + ".svg";
      let data = new FormData();
      data.append("file", this.state.svg, fileName);
      data.append("name", randomString + ".svg.svg");
      data.append("slug", this.state.slug);
      this.setState({ svgName: randomString + ".svg.svg" });
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}api/v1/protected/uploadSVG`,
          data,
          config
        )
        .then((res) => {
          console.log(res.data);
          this.props.SaveSVG(
            this.state.svg,
            this.state.svgName,
            this.state.slug,
            true
          );
          this.props.history.push("/admin/upload/csv");
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(this.state.svg);
    }
  };

  logout = () => {
    this.setState({ isAllowedToView: false });
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("state");
    this.props.Logout();
    this.props.history.push("/login");
  };

  render() {
    return this.state.isAllowedToView ? (
      <section id='svg-upload'>
        <div className='custom-nav slide-bottom'>
          <Navbar collapseOnSelect expand='lg' variant='light'>
            <Navbar.Brand href='/'>Educhain</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='ml-auto'>
                <Button className='sign' onClick={this.logout}>
                  Log Out
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className='cardTemplate'>
          <Card
            className='swing-in-left-fwd'
            style={{
              top: "50%",
            }}
          >
            <Card.Img className='mx-auto' variant='top' src={folder} />
            <Card.Body>
              <Card.Title className='upload-cert-template ml-auto'>
                Upload Certificate Template
              </Card.Title>
            </Card.Body>
            <input
              type='file'
              name='svg'
              id='svg'
              className='fileInput'
              accept='.svg'
              onChange={this.handleFile}
              style={{ color: "black", align: "center" }}
            />
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='swing-in-left-fwd'></Form.Label>
              <Form.Control
                className='swing-in-left-fwd'
                style={{
                  animationDelay: "0.2s",
                  width: "50%",
                  position: "absolute",
                  left: "25%",
                }}
                type='text'
                name='filename'
                placeholder='Enter Filename'
                onChange={this.changeHandler}
              />
            </Form.Group>
            <p align='center' className='error mt-5'>
              {this.state.error}
            </p>
            {this.state.isSvgUploaded ? (
              <Button
                align='center'
                variant='primary'
                className='swing-in-left-fwd center-btn'
                style={{ animationDelay: "0.4s" }}
                onClick={this.SVGSave}
              >
                Upload and Continue
              </Button>
            ) : null}
          </Card>
        </div>
        <div className='cert-thumb'>
          <h5 align='center' className='info' style={{ marginTop: "20px" }}>
            --OR SELECT FROM EXISING AVAILABLE TEMPLATES--
          </h5>
          <Row style={{ textAlign: "center" }} className='align-items-center'>
            {this.state.svgList.map((i) => (
              <Col sm={12} md={12} lg={3}>
                <div
                  className='cert-wrapper'
                  onClick={() => {
                    this.props.SaveSVG(
                      `${process.env.REACT_APP_BACKEND_URL}api/static/media/${i.svg_id}`,
                      i.svg_id,
                      i.slug,
                      false
                    );
                    this.props.history.push("/admin/upload/csv");
                  }}
                >
                  <h5>{i.svg_slug}</h5>
                  <object
                    className='cert-card'
                    data={`${process.env.REACT_APP_BACKEND_URL}api/static/media/${i.svg_id}`}
                    type='image/svg+xml'
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <Footer />
      </section>
    ) : (
      <Redirect to='/login' />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  isAdmin: state.Admin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch({ type: LOGOUT });
    },
    SaveSVG: (svgData, svgName, slug, isSvgUploaded) => {
      dispatch({
        type: UPLOAD_SVG,
        svgPayload: svgData,
        svgName: svgName,
        svgSlug: slug,
        isSvgUploaded: isSvgUploaded,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin_SVGUpload);

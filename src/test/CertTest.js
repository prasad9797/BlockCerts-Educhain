import React from "react";
import cert from "./certi.svg";
import "../CSS/cert.css";

class CertTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: cert,
      certData: {},
    };
  }

  async componentWillMount() {
    console.log("ComponentWillMount");
    var certJson = {
      name: "Tejas",
      certID: "asv67DG",
      email: "tejas@gmail.com",
    };
    var svg = "http://sia.eventsapsit.org/certi.svg";
    console.log(certJson, svg);
    await this.setState({
      svg: svg,
      certData: certJson,
    });
    console.log(this.state.svg);
    console.log(this.state.certData);
  }

  componentDidMount() {
    console.log("ComponentDidMount");
    //Post method invoke
    //res json
    // window.addEventListener("load", this.findSVGElements, false);
    document.getElementById("name").textContent = "Tejas";
    document.getElementById("certID").textContent = "tgAg67a";
  }

  // getSubDocument = (embedding_element) => {
  //     console.log("getSub");
  //     console.log(embedding_element);
  //     if (embedding_element.contentDocument) {
  //         return embedding_element.contentDocument;
  //     }
  //     else {
  //         var subdoc = null;
  //         try {
  //             subdoc = embedding_element.getSVGDocument();
  //         } catch (e) { }
  //         return subdoc;
  //     }
  // }

  // findSVGElements = () => {
  //     var elms = document.getElementById('SVGdocument');
  //     console.log(elms);
  //     for (var i = 0; i < elms.length; i++) {
  //         console.log("Hye: ", elms[i]);
  //         var subdoc = this.getSubDocument(elms[i]);
  //         console.log(subdoc);
  //         if (subdoc) {
  //             console.log("Hey there x2");
  //             subdoc.getElementById("name").textContent = "Tejas";
  //             subdoc.getElementById("certID").textContent = "shdjfkhsdkjfh";
  //         }
  //     }
  // }

  render() {
    const parse = require("html-react-parser");
    return (
      <div className="center">
        {parse(this.state.svg ? this.state.svg : "")}
      </div>
    );
  }
}

export default CertTest;

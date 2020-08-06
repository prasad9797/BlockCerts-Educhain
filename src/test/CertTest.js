import React from 'react';
import cert from './certi.svg';
import '../CSS/cert.css';


function getSubDocument(embedding_element) {
    if (embedding_element.contentDocument) {
        return embedding_element.contentDocument;
    }
    else {
        var subdoc = null;
        try {
            subdoc = embedding_element.getSVGDocument();
        } catch (e) { }
        return subdoc;
    }
}

function findSVGElements() {
    var elms = document.querySelectorAll(".SVGdocument");
    for (var i = 0; i < elms.length; i++) {
        var subdoc = getSubDocument(elms[i])
        if (subdoc) {
            subdoc.getElementById("name").textContent = "Tejas Raibagi";
            subdoc.getElementById("certID").textContent = "AV2576GDGF";
        }
    }
}

class CertTest extends React.Component {
    componentDidMount() {
        window.addEventListener("load", findSVGElements, false);
    }

    render() {
        return (
            <div className="center">
                <object className="SVGdocument" data={cert} type='image/svg+xml' />
            </div>

        );
    }
}

export default CertTest;
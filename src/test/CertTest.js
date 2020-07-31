import React from 'react';
import cert from './te.svg';

class CertTest extends React.Component {
    componentDidMount() {
        document.getElementById('name').textContent = "Tejas";
    }

    render() {
        return (
            <div className="center">
                <object data={cert} type='image/svg+xml' />
            </div>

        );
    }
}

export default CertTest;
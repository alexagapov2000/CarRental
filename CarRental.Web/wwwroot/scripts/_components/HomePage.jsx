import React from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import './HomePage.css';
import { withRouter } from 'react-router-dom';

class HomePage extends React.Component {

    render() {
        return <div style={{ width: '100%', padding: 'none' }}>
            <video
                className='video'
                style={{ float: 'left top', width: '100%', objectFit: 'fill', overflow: 'hidden', opacity: '1', filter: 'blur(15px)', position: 'absolute', zIndex: '-1' }}
                className="video-container video-container-overlay"
                autoPlay
                loop
                muted
                data-reactid=".0.1.0.0">
                <source type="video/mp4" data-reactid=".0.1.0.0.0" src="../../backgroundVideo/CarRentalBackGroundVideo.webm" />
            </video>
            <h1>NO CAR NEARBY?</h1>
            <h2>THEN WELCOME</h2>
        </div>;
    }
}

export default withRouter(HomePage);
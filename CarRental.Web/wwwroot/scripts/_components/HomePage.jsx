import React from 'react';

export default class HomePage extends React.Component {

    render() {
        return <div style={{width: '100%', position: 'absolute', float: 'left top', padding: 'none', zIndex: '-1', opacity: '0.65', filter: 'blur(15px)' }}>
            <video
                style={{ width: '100%', objectFit: 'fill', overflow: 'hidden' }}
                className="video-container video-container-overlay"
                autoPlay
                loop
                muted
                data-reactid=".0.1.0.0">
                <source type="video/mp4" data-reactid=".0.1.0.0.0" src="../../backgroundVideo/CarRentalBackGroundVideo.webm" />
            </video>
        </div>;
    }
}
import React from 'react';
import './loadingScreen.css'; 

export default class LoadingScreen extends React.Component {

    render() {
        let className = this.props.isFetching ? 'loadingScreen' : '';
        return <div className={className}>
        </div>;
    }
}
import React from 'react';
import { Image } from "react-bootstrap";

export default class EmptyNotificator extends React.Component {

    render() {
        return <div className='emptyImage'>
            <Image src='../../CarRentalIcons/empty.png'></Image>
            <br />
            {this.props.children}
            </div>;
    }
}
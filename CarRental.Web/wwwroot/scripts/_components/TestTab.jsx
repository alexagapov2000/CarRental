import React from 'react';
import Axios from 'axios';

export default class TestTab extends React.Component {

    getError = async e => {
        let kal = await Axios.post('api/account/decode', null, { headers: { jwt: localStorage.token } });
        console.log(kal);
    }

    render() {
        return <button onClick={this.getError}>Kal</button>
    }
}
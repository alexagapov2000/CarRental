import React from 'react';
import Axios from 'axios';

export default class Creating extends React.Component {

    constructor(props) {
        super(props);
    }

    addCountry(e) {
        if(e.keyCode == 13) {
            Axios.put('api/some/3', {id: 3, name: e.target.value});
        }
    }

    render() {
        return <div>
            <div><input type="text" onKeyDown={this.addCountry}/></div>
        </div>
    };
}
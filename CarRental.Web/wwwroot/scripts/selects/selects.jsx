import React from 'react';
import { connect } from 'react-redux';
import EntitySelect from './entitySelect.jsx';

export default class Selects extends React.Component {

    constructor(props) {
        super();
        this.countryID = 0;
    }

    changeCountryID() {
        this.countryID = document.getElementById('country').props.currentID;
    }

    render() {
        return <table>
                    <tr>
                        <td>Countries</td>
                        <td><EntitySelect
                            id="country"
                            controller='/home/GetCountries'
                            onChange='changeCountryID()'/></td>
                    </tr>
                    <tr>
                        <td>Cities</td>
                        <td><EntitySelect controller={`/home/GetCities/${this.countryID}`}/></td>
                    </tr>
                </table>;
    }
};

/*
let mapProps = (state) => {
    return {
        posts: state.data,
        error: state.error
    }
}

let mapDispatch = (dispatch) => {
    return {
        getPosts: (index, tags) => dispatch(getPosts(index, tags))
    }
}
*/

//export default connect(mapProps, mapDispatch)(Selects)
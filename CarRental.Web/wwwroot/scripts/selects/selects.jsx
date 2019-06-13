import React from 'react';
import { connect } from 'react-redux';
import EntitySelect from './entitySelect.jsx';
import { timingSafeEqual } from 'crypto';

export default class Selects extends React.Component {

    constructor(props) {
        super();
        this.getCountryID = this.getCountryID.bind(this);
    }

    getCountryID() {
        return this.refs.country.state.currentID;
    }

    componentDidMount() {
        
    }

    render() {
        return <div className='selects'>
            <div>
                <span>Country</span>
                <EntitySelect
                    ref='country'
                    controller='/home/GetCountries'/>
            </div>
            <div>
                <span>Cities</span>
                <EntitySelect
                    ref='city'
                    controller={`/home/GetCities/${this.getCountryID}`}/>
            </div>
        </div>;
    };
}

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
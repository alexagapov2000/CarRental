import React from 'react';
import EntitySelect from './entitySelect.jsx';

export default class CitySelect extends EntitySelect{
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.controller !== this.props.controller) {
            this.loadList();
        }
        return this.state !== nextState;
    }
}
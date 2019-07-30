import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import LocationsFinderMenu from './LocationsFinderMenu.jsx';
import { store } from "../../_store/configureStore.jsx";

class LocationsFinder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
        };
    }

    renderLocations = () => {
        return this.state.cities
            .map(city => <Dropdown.Item key={city.id}>{city.name}</Dropdown.Item>);
    }

    componentDidMount() {
        this.props.loadCities()
            .then(result => this.setState({ cities: store.getState().common.cities }));
    }

    render() {
        return <Dropdown>
            <Dropdown.Toggle variant='outline-light' id="dropdown-custom-components">
                Find car rental point
            </Dropdown.Toggle>
            <Dropdown.Menu as={LocationsFinderMenu}>
                {this.renderLocations()}
            </Dropdown.Menu>
        </Dropdown>;
    }
}

export default withRouter(LocationsFinder);
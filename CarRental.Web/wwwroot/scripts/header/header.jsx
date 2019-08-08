import React from 'react';
import { Navbar, Nav, Button, ButtonGroup } from 'react-bootstrap';
import { NavLink, Link, withRouter } from 'react-router-dom';
//import LocationsFinderContainer from '../_containers/LocationsFinderContainer.jsx';
import LocationsFinder from '../_components/LocationsFinder/LocationsFinder.jsx';
import SignUpContainer from '../_containers/SignUpContainer.jsx';
import AuthFormContainer from '../_containers/AuthFormContainer.jsx';

class Header extends React.Component {

    render() {
        return (
            <Navbar expand='lg' bg='dark' variant='dark' style={{ borderBottom: '1px solid black' }}>
                <Navbar.Brand as={Link} to='/home'>CarRental</Navbar.Brand>
                <Nav className='mr-auto justify-content-between'>
                    <Nav.Link as={NavLink} to='/createLocation'>Create new location</Nav.Link>
                    <Nav.Link as={NavLink} to='/selectLocation'>Selects</Nav.Link>
                    <Nav.Link as={NavLink} to='/locationsTable'>Locations table</Nav.Link>
                    <LocationsFinder></LocationsFinder>
                </Nav>
                <Nav variant='pills'>
                    <ButtonGroup size='sm'>
                        <AuthFormContainer />
                        <SignUpContainer />
                    </ButtonGroup>
                </Nav>
            </Navbar>
        );
    }
};

export default withRouter(Header);
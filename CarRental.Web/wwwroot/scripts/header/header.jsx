import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import LocationsFinder from '../_components/LocationsFinder.jsx';

export default class Header extends React.Component {
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
                    <Nav.Link as={NavLink} to='/signIn'>Sign in</Nav.Link>
                    <Nav.Link as={NavLink} to='/signUp'>Sign up</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
};
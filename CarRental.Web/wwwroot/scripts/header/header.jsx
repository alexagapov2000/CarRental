import React from 'react';
import { Navbar, Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { NavLink, Link, withRouter } from 'react-router-dom';
//import LocationsFinderContainer from '../_containers/LocationsFinderContainer.jsx';
import LocationsFinder from '../_components/LocationsFinder/LocationsFinder.jsx';
import SignUpContainer from '../_containers/SignUpContainer.jsx';
import AuthFormContainer from '../_containers/AuthFormContainer.jsx';
import { store } from '../_store/configureStore.jsx';
import PrivateOfficeContainer from '../_containers/PrivateOfficeContainer.jsx';

class Header extends React.Component {

    renderPrivateOfficeButton = () => {
        return <Dropdown as={ButtonGroup}>
            <Button size='sm' variant='outline-light' onClick={e => this.props.history.push('/privateOffice')}>
                {this.props.account.username}
            </Button>
            <Dropdown.Toggle size='sm' split variant='outline-light' id='dropdown-split-basic' />
            <Dropdown.Menu>
                <Dropdown.Item onClick={e => {
                    this.props.exit();
                    this.props.history.push('/home');
                }}>Exit</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>;
    }

    render() {
        let authFormOrPrivateOffice = this.props.account ?
            this.renderPrivateOfficeButton() :
            <AuthFormContainer />;
        return (
            <Navbar sticky='top' expand='lg' bg='dark' variant='dark' style={{ borderBottom: '1px solid black' }}>
                <Navbar.Brand as={Link} to='/home'>CarRental</Navbar.Brand>
                <Nav className='mr-auto justify-content-between'>
                    <Nav.Link as={NavLink} to='/createLocation'>Create new location</Nav.Link>
                    <Nav.Link as={NavLink} to='/selectLocation'>Selects</Nav.Link>
                    <Nav.Link as={NavLink} to='/locationsTable'>Locations table</Nav.Link>
                    <LocationsFinder></LocationsFinder>
                </Nav>
                <Nav variant='pills'>
                    <ButtonGroup size='sm'>
                        {authFormOrPrivateOffice}
                        <SignUpContainer />
                    </ButtonGroup>
                </Nav>
            </Navbar>
        );
    }
};

export default withRouter(Header);
import React from 'react';
import { Modal, Button, Form, Spinner, ToggleButtonGroup, ToggleButton, Alert } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { store } from '../_store/configureStore.jsx';
import { debounce } from 'lodash';
import './AuthForm.css';

class AuthForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertMessage: null,
        };
    }

    signIn = async (username, password, isSaveSession) => {
        await this.props.authUser(username, password);
        if (isSaveSession)
            this.props.saveUser();
        else
            localStorage.removeItem('token');
    }

    submit = async e => {
        e.preventDefault();
        let username = e.target.querySelector('#username').value;
        let password = e.target.querySelector('#password').value;
        let isRemember = e.target.querySelector('#rememberMe input').checked;
        await this.signIn(username, password, isRemember);
        if (store.getState().common.account)
            this.props.history.push('/home');
        else
            this.setState({ alertMessage: store.getState().common.badResponse });
    }

    renderUsernameInput = () => {
        return <Form.Control
            id='username'
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Username'
            disabled={this.props.isFetching} />;
    }

    renderPasswordInput = () => {
        return <Form.Control
            id='password'
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Password'
            disabled={this.props.isFetching}
            type='password' />;
    }

    renderRememberMeCheckbox = () => {
        return <ToggleButtonGroup type="checkbox">
            <ToggleButton
                id='rememberMe'
                disabled={this.props.isFetching}
                value={true}
                variant='outline-dark'>
                Remember me
            </ToggleButton>
        </ToggleButtonGroup>;
    }

    render() {
        let usernameInput = this.renderUsernameInput();
        let passwordInput = this.renderPasswordInput();
        let rememberMeCheckbox = this.renderRememberMeCheckbox();

        let buttonValue = this.props.isFetching ?
            <React.Fragment>Loading...<Spinner animation='border' size='sm' /></React.Fragment> :
            'Login';

        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.submit}>
                <Modal.Body>
                    {usernameInput}
                    <Alert id='usernameAlert' variant='danger'>Only digits, latin symbols, '_', '-', '.' and minlength >= 4</Alert>
                    <p></p>
                    {passwordInput}
                    <Alert id='passwordAlert' variant='danger'>Only digits, latin symbols, '_', '-', '.' and minlength >= 4</Alert>
                    <p></p>
                    {rememberMeCheckbox}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit' disabled={this.props.isFetching}>{buttonValue}</Button>
                </Modal.Footer>
            </Form>
            <Alert variant='danger' hidden={!this.state.alertMessage}>{this.state.alertMessage}</Alert>
        </Modal.Dialog>;
    }
}

export default withRouter(AuthForm);
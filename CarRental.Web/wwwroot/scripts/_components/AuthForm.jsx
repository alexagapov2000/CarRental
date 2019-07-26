import React from 'react';
import { Modal, Button, Form, Spinner, ToggleButtonGroup, ToggleButton, Alert } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { store } from '../_store/configureStore.jsx';

class AuthForm extends React.Component {

    signIn = async (username, password, isSaveSession) => {
        await this.props.authUser(username, password);
        if (isSaveSession)
            this.props.saveUser();
        else
            localStorage.removeItem('token');
    }

    render() {
        let username = '';
        let usernameInput = <Form.Control
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Username'
            disabled={this.props.isFetching}
            onChange={e => username = e.target.value} />;
        let password = '';
        let passwordInput = <Form.Control
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Password'
            disabled={this.props.isFetching}
            type='password'
            onChange={e => password = e.target.value} />;
        let isRemember = false;
        let rememberMeCheckbox = <ToggleButtonGroup
            type="checkbox"
            defaultValue={isRemember ? [1] : []}
            onChange={e => isRemember = e.length > 0}>
            <ToggleButton disabled={this.props.isFetching} value={1} variant='outline-primary'>Remember me</ToggleButton>
        </ToggleButtonGroup>;

        let buttonValue = this.props.isFetching ?
            <React.Fragment>Loading...<Spinner animation='border' size='sm' /></React.Fragment> :
            'Login';

        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Form onSubmit={async e => {
                e.preventDefault();
                await this.signIn(username, password, isRemember);
                if (store.getState().common.account)
                    this.props.history.push('/home');
            }}>
                <Modal.Body>
                    <p>{usernameInput}</p>
                    <p>{passwordInput}</p>
                    <p>{rememberMeCheckbox}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit' disabled={this.props.isFetching}>{buttonValue}</Button>
                </Modal.Footer>
            </Form>
            <Alert variant='danger' hidden={!store.getState().common.badResponse}>{store.getState().common.badResponse}</Alert>
        </Modal.Dialog>;
    }
}

export default withRouter(AuthForm);
import React from 'react';
import LoadingScreen from '../customComponents/loadingScreen/loadingScreen.jsx';
import { Modal, Button, Form, Spinner } from "react-bootstrap";

export default class AuthForm extends React.Component {

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
            defaultValue=''
            disabled={this.props.isFetching}
            onChange={e => username = e.target.value} />;
        let password = '';
        let passwordInput = <Form.Control
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Password'
            defaultValue=''
            disabled={this.props.isFetching}
            type='password'
            onChange={e => password = e.target.value} />;
        let isSaveSession = false;
        let saveSession = <Form.Check
            label='Remember me'
            disabled={this.props.isFetching}
            type='checkbox'
            onChange={e => isSaveSession = e.target.checked} />;

        let buttonValue = this.props.isFetching ?
            <React.Fragment>Loading...<Spinner animation='border' size='sm' /></React.Fragment> :
            'Login';

        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Form onSubmit={e => {
                e.preventDefault();
                this.signIn(username, password, isSaveSession)
            }}>
                <Modal.Body>
                    <p>{usernameInput}</p>
                    <p>{passwordInput}</p>
                    <p>{saveSession}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit' disabled={this.props.isFetching}>{buttonValue}</Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>;
    }
}
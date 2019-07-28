import React from 'react';
import { Form, Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './SignUpForm.css';

class SignUpForm extends React.Component {

    signUp = async (username, password1, password2) => {
        await this.props.signUpUser(username, password1, password2);
    }

    submit = async e => {
        e.preventDefault();
        let username = e.target.querySelector('#usernameSignUp').value;
        let password1 = e.target.querySelector('#password1SignUp').value;
        let password2 = e.target.querySelector('#password2SignUp').value;
        await this.signUp(username, password1, password2);
        this.props.history.push('/home');
    }

    renderUsernameInput = () => {
        return <Form.Control
            id='usernameSignUp'
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Username'
            disabled={this.props.isFetching} />;
    }

    renderPassword1Input = () => {
        return <Form.Control
            id='password1SignUp'
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Password'
            type='password'
            disabled={this.props.isFetching} />;
    }

    renderPassword2Input = () => {
        return <Form.Control
            id='password2SignUp'
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Repeat password'
            type='password'
            disabled={this.props.isFetching} />;
    }

    renderAlert = (id, message = "Only digits, latin symbols, '_', '-', '.' and minlength >= 4") => {
        return <Alert
            id={id}
            variant='danger'>
            {message}
        </Alert>;
    }

    render() {
        let usernameInput = this.renderUsernameInput();
        let password1Input = this.renderPassword1Input();
        let password2Input = this.renderPassword2Input();

        let buttonValue = this.props.isFetching ?
            <React.Fragment>Loading...<Spinner animation='border' size='sm' /></React.Fragment> :
            'Register';

        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.submit}>
                <Modal.Body>
                    {usernameInput}
                    {this.renderAlert('usernameAlertSignUp')}
                    <p></p>
                    {password1Input}
                    {this.renderAlert('password1AlertSignUp')}
                    <p></p>
                    {password2Input}
                    {this.renderAlert('password2AlertSignUp')}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit' disabled={this.props.isFetching}>{buttonValue}</Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>;
    }
}

export default withRouter(SignUpForm);
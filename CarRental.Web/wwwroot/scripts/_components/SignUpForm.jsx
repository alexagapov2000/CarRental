import React from 'react';
import { Form, Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './SignUpForm.css';

class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            alertMessage: null,
        };
    }

    showDialog = () => this.setState({ show: true })
    hideDialog = () => this.setState({ show: false, alertMessage: null })

    signUp = async (username, password1, password2) => {
        await this.props.signUpUser(username, password1, password2);
    }

    submit = async e => {
        e.preventDefault();
        let username = e.target.querySelector('#usernameSignUp').value;
        let password1 = e.target.querySelector('#password1SignUp').value;
        let password2 = e.target.querySelector('#password2SignUp').value;
        await this.signUp(username, password1, password2)
            .catch(x => {
                this.setState({ alertMessage: x });
                throw x;
            });
        let { pathname, search } = this.props.location;
        await this.props.history.push('/');
        await this.props.history.push(pathname + search);
        this.hideDialog();
    }

    renderInput = (id, placeholder, type) => {
        return <Form.Control
            id={id}
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder={placeholder}
            disabled={this.props.isFetching}
            type={type} />;
    }

    renderAlert = (id, message = "Only digits, latin symbols, '_', '-', '.' and minlength >= 4") => {
        return <Alert id={id} variant='danger'>{message}</Alert>;
    }

    renderModal = () => {
        let buttonValue = this.props.isFetching ?
            <React.Fragment>Loading...<Spinner animation='border' size='sm' /></React.Fragment> :
            'Register';

        return <Modal show={this.state.show} onHide={this.hideDialog} centered>
            <Modal.Header>
                <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Form onSubmit={this.submit}>
                <Modal.Body>
                    {this.renderInput('usernameSignUp', 'Username', 'text')}
                    {this.renderAlert('usernameAlertSignUp')}
                    <p></p>
                    {this.renderInput('password1SignUp', 'Password', 'password')}
                    {this.renderAlert('password1AlertSignUp')}
                    <p></p>
                    {this.renderInput('password2SignUp', 'Repeat password', 'password')}
                    {this.renderAlert('password2AlertSignUp')}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit' disabled={this.props.isFetching}>{buttonValue}</Button>
                </Modal.Footer>
            </Form>
            <Alert variant='danger' hidden={!this.state.alertMessage}>{this.state.alertMessage}</Alert>
        </Modal>;
    }

    render() {
        return <React.Fragment>
            {this.renderModal()}
            <Button onClick={this.showDialog} variant='light'>Sign up</Button>
        </React.Fragment>;
    }
}

export default withRouter(SignUpForm);
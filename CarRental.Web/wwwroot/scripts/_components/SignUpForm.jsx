import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class SignUpForm extends React.Component {

    signUp = async (username, password1, password2) => {
        await this.props.signUpUser(username, password1, password2);
    }

    render() {
        let username = '';
        let usernameInput = <Form.Control
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Username'
            onChange={e => username = e.target.value} />;
        let password1 = '';
        let password1Input = <Form.Control
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Password'
            type='password'
            onChange={e => password1 = e.target.value} />;
        let password2 = '';
        let password2Input = <Form.Control
            pattern='[a-zA-Z0-9_.-]{4,}'
            placeholder='Repeat password'
            type='password'
            onChange={e => password2 = e.target.value} />;

        return <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Form onSubmit={async e => {
                e.preventDefault();
                await this.signUp(username, password1, password2);
                this.props.history.push('/home');
            }}>
                <Modal.Body>
                    <p>{usernameInput}</p>
                    <p>{password1Input}</p>
                    <p>{password2Input}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit' disabled={this.props.isFetching}>Register</Button>
                </Modal.Footer>
            </Form>
        </Modal.Dialog>;
    }
}

export default withRouter(SignUpForm);
import React from 'react';
import LoadingScreen from '../customComponents/loadingScreen/loadingScreen.jsx';
import { Modal, Button, Form } from "react-bootstrap";
//import './AuthForm.css';

export default class AuthForm extends React.Component {

    signIn = async (usernameInput, passwordInput, isSaveSession) => {
        let usernameInputId = usernameInput.props.id;
        let passwordInputId = passwordInput.props.id;
        let username = document.getElementById(usernameInputId).value;
        let password = document.getElementById(passwordInputId).value;
        await this.props.authUser(username, password);
        if (isSaveSession)
            this.props.saveUser();
        else
            localStorage.removeItem('token');
    }

    componentDidMount() {
        //const fieldset = document.querySelector('#authFormFieldset');
        //const button = fieldset.querySelector('button');
        //button.addEventListener('click', () => fieldset.style.opacity = 0.2);
    }

    render() {
        let usernameInput = <Form.Control pattern='[a-zA-Z0-9_-]{4,}' placeholder='Username' />;
        let passwordInput = <Form.Control pattern='[a-zA-Z0-9]*' minLength='4' placeholder='Password' id='passwordInput' type='password' />;
        let isSaveSession = false;
        let saveSession = <Form.Check onClick={e => isSaveSession = e.target.checked} id='saveSessionCheckbox' type='checkbox' />

        let fieldsetClass = this.props.isFetching ? 'fetching' : '';
        return <Modal.Dialog>
            <LoadingScreen isFetching={this.props.isFetching} />

            <Modal.Header>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/*
                <form onSubmit={e => {
                    e.preventDefault();
                    this.signIn(usernameInput, passwordInput, isSaveSession)
                }}>
                    <div>
                        {usernameInput}
                        <span className='invalidTips'>Only latin symbols and digits! Length must be bigger than 3 symbols!</span>
                    </div>
                    <div>{passwordInput}</div>
                    <div><label htmlFor={saveSession.props.id}>{saveSession}Load account after returning</label></div>
                    <div><Button type='submit'>Login</Button></div>
                </form>
                */}
                <Form onSubmit={e => {
                    e.preventDefault();
                    this.signIn(usernameInput, passwordInput, isSaveSession) }}>
                    {/*
                        <Form.Control placeholder="Username" pattern='[a-zA-Z0-9_.-]{4,}' />
                        <Form.Control placeholder="Password" pattern='[a-zA-Z0-9_.-]{4,}' type='password' />
                        <Form.Check type="checkbox" label="Remember me" />
                        <Button variant="primary" type="submit">Submit</Button>
                    */}
                    {usernameInput}
                    {passwordInput}
                    {saveSession}
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal.Dialog>;
    }
}
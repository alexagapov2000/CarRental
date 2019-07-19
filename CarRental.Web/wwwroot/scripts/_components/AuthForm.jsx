import React from 'react';
import { store } from '../_store/configureStore.jsx';

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

    render() {
        let usernameInputSignIn = <input placeholder='Username' id='usernameInputSignIn' type='text' />;
        let passwordInputSignIn = <input placeholder='Password' id='passwordInputSignIn' type='password' />;
        let isSaveSession = false;
        let saveSession = <input onClick={e => isSaveSession = e.target.checked} id='saveSessionCheckbox' type='checkbox' />

        let usernameInputSignUp = <input placeholder='Username' id='usernameInputSignUp' type='text' />;
        let passwordInputSignUp = <input placeholder='Password' id='passwordInputSignUp' type='password' />;
        return <div>
            <fieldset>
                <legend>Sign in</legend>
                <p>{usernameInputSignIn}</p>
                <p>{passwordInputSignIn}</p>
                <p><label htmlFor={saveSession.props.id}>{saveSession}Load account after returning</label></p>
                <p>
                    <button onClick={e => this.signIn(usernameInputSignIn, passwordInputSignIn, isSaveSession)}>Login</button>
                    <span></span>
                </p>
            </fieldset>
            <fieldset>
                <legend>Sign up</legend>
                <p>{usernameInputSignUp}</p>
                <p>{passwordInputSignUp}</p>
            </fieldset>
        </div>;
    }
}
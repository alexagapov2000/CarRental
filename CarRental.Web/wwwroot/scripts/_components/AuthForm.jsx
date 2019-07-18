import React from 'react';

export default class AuthForm extends React.Component {

    signIn = async (usernameInput, passwordInput) => {
        let usernameInputId = usernameInput.props.id;
        let passwordInputId = passwordInput.props.id;
        let username = document.getElementById(usernameInputId).value;
        let password = document.getElementById(passwordInputId).value;
        await this.props.authUser(username, password);
    }

    authAndSaveUser = async (username, password) => {
        await this.signIn(username, password);
        this.props.saveUser();
    }

    render() {
        let usernameInput = <input id='usernameInput' type="text"/>;
        let passwordInput = <input id='passwordInput' type="password"/>;
        return <fieldset>
            <legend>Sign in</legend>
            {usernameInput}
            {passwordInput}
            <button onClick={() => this.authAndSaveUser(usernameInput, passwordInput)}>Login</button>
        </fieldset>;
    }
}
import React from 'react';

export default class AuthForm extends React.Component {

    signIn = (usernameInput, passwordInput) => {
        let usernameInputId = usernameInput.props.id;
        let passwordInputId = passwordInput.props.id;
        let username = document.getElementById(usernameInputId).value;
        let password = document.getElementById(passwordInputId).value;
        this.props.authUser(username, password);
    }

    render() {
        let usernameInput = <input id='usernameInput' type="text"/>;
        let passwordInput = <input id='passwordInput' type="text"/>;
        return <fieldset>
            <legend>Sign in</legend>
            {usernameInput}
            {passwordInput}
            <button onClick={() => this.signIn(usernameInput, passwordInput)}>Login</button>
        </fieldset>;
    }
}
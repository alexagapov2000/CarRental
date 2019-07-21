import React from 'react';

export default class SignUpForm extends React.Component {

    signUp = async (usernameInput, password1Input, password2Input) => {
        let usernameInputId = usernameInput.props.id;
        let password1InputId = password1Input.props.id;
        let password2InputId = password2Input.props.id;
        let username = document.getElementById(usernameInputId).value;
        let password1 = document.getElementById(password1InputId).value;
        let password2 = document.getElementById(password2InputId).value;
        await this.props.signUpUser(username, password1, password2);
    }

    render() {
        let usernameInput = <input placeholder='Username' id='usernameInput' type="text"/>;
        let password1Input = <input placeholder='Password' id='password1Input' type='password'/>;
        let password2Input = <input placeholder='Repeat password' id='password2Input' type='password'/>;

        return <div>
            <fieldset>
                <legend>Sign up</legend>
                <p>{usernameInput}</p>
                <p>{password1Input}</p>
                <p>{password2Input}</p>
                <p><button onClick={e => this.signUp(usernameInput, password1Input, password2Input)}>Register</button></p>
            </fieldset>
        </div>;
    }
}
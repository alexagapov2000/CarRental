import React from 'react';
import LoadingScreen from '../customComponents/loadingScreen/loadingScreen.jsx';
import './AuthForm.css';

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
        let usernameInput = <input pattern='[a-zA-Z][a-zA-Z0-9]{3,50}' placeholder='Username' id='usernameInput' type='text' />;
        let passwordInput = <input pattern='[a-zA-Z0-9]{4,50}' placeholder='Password' id='passwordInput' type='password' />;
        let isSaveSession = false;
        let saveSession = <input onClick={e => isSaveSession = e.target.checked} id='saveSessionCheckbox' type='checkbox' />

        let fieldsetClass = this.props.isFetching ? 'fetching' : '';
        return <div>
            <fieldset className={fieldsetClass} id='authFormFieldset'>
                <legend>Sign in</legend>
                <LoadingScreen isFetching={this.props.isFetching} />
                <form onSubmit={e => {
                    e.preventDefault();
                    this.signIn(usernameInput, passwordInput, isSaveSession)
                }}>
                    <div>{usernameInput}<span className='invalidTips'>Otsosi</span></div>
                    <div>{passwordInput}</div>
                    <div><label htmlFor={saveSession.props.id}>{saveSession}Load account after returning</label></div>
                    <div><button type='submit'>Login</button></div>
                </form>
            </fieldset>
        </div>;
    }
}
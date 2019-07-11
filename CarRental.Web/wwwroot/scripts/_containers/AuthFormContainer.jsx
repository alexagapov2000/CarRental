import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/AuthFormActions.jsx';
import AuthForm from '../_components/AuthForm.jsx';

class AuthFormContainer extends React.Component {
    
    render() {
        return <AuthForm
            username={this.props.authForm.username}
            password={this.props.authForm.password}
            authUser={this.props.authUser}
            isFetching={this.props.isFetching} />;
    }
}

const mapStateToProps = store => {
    return {
        username: store.username,
        password: store.password,

        authUser: store.authUser,

        authForm: store.authForm,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authUser: (username, password) =>
            dispatch(actions.authUser(username, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer);
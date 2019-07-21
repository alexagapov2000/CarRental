import React from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../_actions/IndexActions.jsx';
import AuthForm from '../_components/AuthForm.jsx';

class AuthFormContainer extends React.Component {
    
    render() {
        return <AuthForm
            username={this.props.username}
            password={this.props.password}
            authUser={this.props.authUser}
            reAuthUser={this.props.reAuthUser}
            saveUser={this.props.saveUser}
            isFetching={this.props.isFetching} />;
    }
}

const mapStateToProps = store => {
    return {
        username: store.common.username,
        password: store.common.password,
        isFetching: store.common.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authUser: (username, password) => dispatch(commonActions.authUser(username, password)),
        saveUser: () => dispatch(commonActions.saveUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer);
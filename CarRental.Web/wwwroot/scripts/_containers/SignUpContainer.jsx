import React from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../_actions/IndexActions.jsx';
import SignUpForm from '../_components/SignUpForm.jsx';

class SignUpContainer extends React.Component {

    render() {
        return <SignUpForm 
            username={this.props.username}
            password={this.props.password}
            signUpUser={this.props.signUpUser}
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
        signUpUser: (username, password1, password2) => dispatch(commonActions.signUpUser(username, password1, password2)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
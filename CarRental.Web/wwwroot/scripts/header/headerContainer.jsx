import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/IndexActions.jsx';
import Header from '../header/header.jsx';

class HeaderContainer extends React.Component {

    render() {
        return <Header
            isFetching={this.props.isFetching}
            exit={this.props.exit}
            account={this.props.account}/>;
    }
}

const mapStateToProps = store => {
    return {
        account: store.common.account,
        isFetching: store.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        exit: () => dispatch(actions.exit()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
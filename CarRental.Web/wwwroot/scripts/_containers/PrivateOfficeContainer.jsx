import React from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../_actions/IndexActions.jsx';
import * as actions from '../_actions/PrivateOfficeActions.jsx';
import PrivateOffice from '../_components/PrivateOffice.jsx';

class PrivateOfficeContainer extends React.Component {

    render() {
        return <PrivateOffice
            username={this.props.username}
            orders={this.props.orders}
            loadOrders={this.props.loadOrders}
            deleteOrder={this.props.deleteOrder}
            reAuthUser={this.props.reAuthUser}
            isFetching={this.props.isFetching} />;
    }
}

const mapStateToProps = store => {
    let account = store.common.account;
    return {
        username: account ? account.username : account,
        orders: store.privateOffice.orders || [],
        isFetching: store.isFetching,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteOrder: orderId => dispatch(actions.deleteOrder(orderId)),
        loadOrders: username => dispatch(actions.loadOrders(username)),
        reAuthUser: () => dispatch(commonActions.reAuthUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateOfficeContainer);
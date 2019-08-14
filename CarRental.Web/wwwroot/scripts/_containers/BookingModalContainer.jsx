import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../_actions/BookingModalActions.jsx';
import BookingModal from '../_components/RentalsFinder/BookingModal.jsx';

class BookingModalContainer extends React.Component {

    render() {
        return <BookingModal {...this.props}
            isOrderWasMade={this.props.isOrderWasMade}
            dangerMessage={this.props.dangerMessage}
            submitPurchase={this.props.submitPurchase}
            isFetching={this.props.isFetching}
            isAuthorized={this.props.username}
            isPausedAfterSubmitting={this.props.isPausedAfterSubmitting} />;
    }
}

const mapStateToProps = store => {
    let account = store.common.account;
    return {
        dangerMessage: store.bookingModal.dangerMessage,
        isOrderWasMade: store.bookingModal.isOrderWasMade,
        isFetching: store.bookingModal.isFetching,
        username: account ? account.username : account,
        isPausedAfterSubmitting: store.bookingModal.isPausedAfterSubmitting,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitPurchase: (personID, carID, bookedFrom, bookedTo) =>
            dispatch(actions.submitPurchase(personID, carID, bookedFrom, bookedTo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModalContainer);
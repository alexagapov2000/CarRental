import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header.jsx';
import { connect } from 'react-redux';
import CreatingContainer from './_containers/CreatingContainer.jsx';
import SelectsContainer from './_containers/SelectsContainer.jsx';
import LocationsTableContainer from './_containers/LocationsTableContainer.jsx';
import AuthFormContainer from './_containers/AuthFormContainer.jsx';
import * as commonActions from './_actions/IndexActions.jsx';
import SignUpContainer from './_containers/SignUpContainer.jsx';

import TestTab from './_components/TestTab.jsx';

class App extends React.Component {

    render() {
        this.props.reAuthUser();
        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route path='/selectsRedux' component={SelectsContainer} />
                            <Route path='/creatingRedux' component={CreatingContainer} />
                            <Route path='/locationsTable' component={LocationsTableContainer} />
                            <Route path='/signin' component={AuthFormContainer} />
                            <Route path='/signup' component={SignUpContainer} />
                            <Route path='/test' component={TestTab} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        reAuthUser: () => dispatch(commonActions.reAuthUser()),
    };
};

export default connect(null, mapDispatchToProps)(App);

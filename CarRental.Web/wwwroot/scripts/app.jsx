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
import HomePage from './_components/HomePage.jsx';
import CarsFinderContainer from './_containers/CarsFinderContainer.jsx';

class App extends React.Component {

    render() {
        this.props.reAuthUser();
        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route path='/createLocation' component={CreatingContainer} />
                            <Route path='/selectLocation' component={SelectsContainer} />
                            <Route path='/locationsTable' component={LocationsTableContainer} />
                            <Route path='/signIn' component={AuthFormContainer} />
                            <Route path='/signUp' component={SignUpContainer} />
                            <Route path='/carsFinder' component={CarsFinderContainer} />
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

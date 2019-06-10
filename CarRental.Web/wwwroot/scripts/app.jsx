import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header.jsx';
//import Creating from './creating/creating.jsx'
import Selects from './selects/selects.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/selects" component={Selects} />
                            <Route path="/" component={Selects} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header.jsx';
import Selects from './chooseLocation/selects.jsx';
import Creating from './createLocation/creating.jsx';
import LocationTable from './showLocations/locationTable.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route path='/selects' component={Selects} />
                            <Route path='/creating' component={Creating}/>
                            <Route path='/show' component={LocationTable}/>
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};
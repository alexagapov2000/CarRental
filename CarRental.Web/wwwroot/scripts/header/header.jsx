import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/selects">Selects</Link>
                        </li>
                        <li>
                            <Link to="/creating">Creating a new location</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
};
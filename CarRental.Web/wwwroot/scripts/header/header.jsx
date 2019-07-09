import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link className='link' to='/creatingRedux'>Creating a new country</Link>
                        </li>
                        <li>
                            <Link className='link' to='/selectsRedux'>Selects</Link>
                        </li>
                        <li>
                            <Link className='link' to='/locationsTable'>Locations table</Link>
                        </li>
                        <li>
                            <Link className='link' to='/auth'>auth</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
};
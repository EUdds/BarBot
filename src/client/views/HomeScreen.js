/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Switch, Route, NavLink, Link, BrowserRouter as Router } from 'react-router-dom';
import DebugMenu from './DebugMenu';

class HomeScreen extends Component {
    render() {
        return (
            <>
                <h2>Home Screen</h2>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/debugMenu">Debug Menu</NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>
                </>
        )
    };
}

export default HomeScreen;

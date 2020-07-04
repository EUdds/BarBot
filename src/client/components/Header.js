/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './Header.css';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';
import BackButton from './BackButton';

class Header extends Component {
  render() {
    return (
          <header className="Header">
            <BackButton />
            <h1>BarBotUI</h1>
          </header>
    )
  };
}

export default Header;
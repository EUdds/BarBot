/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './Header.css';
import BackButton from './BackButton';
import SettingsButton from './SettingsButton';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "TODO"
    }
  }

  render() {
    return (
          <header className="Header">
            <div className="left">
            <BackButton />
            </div>

            <div className="center">
            <h1>{this.state.title}</h1>
            </div>
            
            <div className="right">
            <SettingsButton  />
            </div>
          </header>
    )
  };
}

export default Header;
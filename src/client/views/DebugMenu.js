/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './DebugMenu.css'
import { PumpControl } from '../components/PumpControl';
const ip = require('local-ipv4-address');

class DebugMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: 'Loading...'
    }
  }

  componentDidMount() {
    console.log('did mount');
    ip().then((address) => {
      console.log(address)
      this.setState({address: address})
    });
  }

  render() {
    return (
      <div className="App">
        <header className="Subheader">
          <h1>Debug Control</h1>
        </header>
        <div className="buttonGrid">
          <PumpControl number="0"></PumpControl>
          <PumpControl number="1"></PumpControl>
          <PumpControl number="2"></PumpControl>
          <PumpControl number="3"></PumpControl>
          <PumpControl number="4"></PumpControl>
          <PumpControl number="5"></PumpControl>
          <PumpControl number="6"></PumpControl>
          <PumpControl number="7"></PumpControl>
        </div>
        <p>IP Address: {this.state.address}</p>
      </div>
    )
  };
}

export default DebugMenu;
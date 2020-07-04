/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import './DebugMenu.css'
import {PumpControl} from '../components/PumpControl';

class DebugMenu extends Component {
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
    </div>
  )};
}

export default DebugMenu;
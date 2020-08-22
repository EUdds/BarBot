/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import api from '../api'
// import 'react-table/react-table.css';
import './DebugMenu.css'
import { PumpControl } from '../components/PumpControl';

// const ip = require('local-ipv4-address');

class DebugMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pumps: [],
      columns: [],
      isLoading: false
    }
  }

  async componentDidMount() {
    let top = this;
    this.setState({isLoading: true});
    await api.getAllPumps().then(pumps => {
      console.log(pumps.data)
      top.setState({
        pumps: pumps.data,
        isLoading: false
      })
    }).catch((e) => console.error('Can not get pumps ' + e));
    // ip().then((address) => {
    //   console.log(address)
    //   this.setState({address: address})
    // });
  }

  reload() {
    window.location.reload(true);
  }

  render() {
    const {pumps} = this.state;
    console.log('TCL: PumpsList -> render -> pumps', pumps);
    return (
      <div className="App">
        <header className="Subheader">
          <h1>Debug Control</h1>
        </header>
        <div className="buttonGrid">
      {this.state.pumps.map(pump => (
          <PumpControl number={pump.pumpNumber} fluid={pump.fluid} />
      ))}
        </div>
        <div className="utils">
          <button class="btn" onClick={this.reload}>Force Reload</button>
        </div>
      </div>
    )
  };
}

export default DebugMenu;
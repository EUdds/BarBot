/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import api from '../api'
import ReactTable from 'react-table';
// import 'react-table/react-table.css';
import './DebugMenu.css'
import { PumpControl } from '../components/PumpControl';
import styled from 'styled-components';
const ip = require('local-ipv4-address');

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
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

  render() {
    const {pumps, isLoading} = this.state;
    console.log('TCL: PumpsList -> render -> pumps', pumps);
    const columns = [
      {
        Header: 'Pump Number',
        accessor: 'pumpNumber',
      },
      {
        Header: 'Fluid',
        accessor: 'fluid'
      },
      {
        Header: 'Turn On'
      },
      {
        Header: 'Turn Off'
      }
    ]
    let showTable = true;
    if (!this.state.pumps.length) {
      showTable = false;
    }
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
        {/* <div className="buttonGrid">
          <PumpControl number="0"></PumpControl>
          <PumpControl number="1"></PumpControl>
          <PumpControl number="2"></PumpControl>
          <PumpControl number="3"></PumpControl>
          <PumpControl number="4"></PumpControl>
          <PumpControl number="5"></PumpControl>
          <PumpControl number="6"></PumpControl>
          <PumpControl number="7"></PumpControl>
        </div>
        <p>IP Address: {this.state.address}</p> */}
      </div>
    )
  };
}

export default DebugMenu;
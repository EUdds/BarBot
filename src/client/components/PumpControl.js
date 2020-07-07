import React, {Component} from 'react';
import io from 'socket.io-client';
import './PumpControl.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
export class PumpControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: 'http://localhost:7000',
            pump: {
                fluid: 'No Fluid Defined'
            }
        };
        this.socket = io(this.state.endpoint);
        this.state.pumpNumber = props.number;
    }

    onToggleOn = (event) => {
        event.stopPropagation();
        this.socket.emit('state', [this.state.pumpNumber, 'on']);
      }
    
      onToggleOff = (event) => {
          event.stopPropagation();
          this.socket.emit('state', [this.state.pumpNumber, 'off']);
      }

    render() {
        return <div className="pumpControl">
            <p>Pump {this.props.number}</p>
            <p>Fluid: {this.state.pump.fluid}</p>
            <button className="btn"
                onClick={(e) => this.onToggleOn(e)}
        >On!</button>
        <button className="btn"
                onClick={(e) => this.onToggleOff(e)}
        >Off!</button>
        <button className="btn">
            <FontAwesomeIcon icon={['fas', 'edit']} style={{color: 'white'}} />
        </button>
        </div>
    }
}
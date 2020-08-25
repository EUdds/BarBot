import React, { Component } from 'react';
import io from 'socket.io-client';
import './PumpControl.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export class PumpControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: 'http://localhost:7000',
            pump: {
                fluid: props.fluid,
                number: props.number
            }
        };
        this.socket = io(this.state.endpoint);
    }

    onToggleOn = (event) => {
        event.stopPropagation();
        this.socket.emit('state', [this.state.pump.number, 'on']);
    }

    onToggleOff = (event) => {
        event.stopPropagation();
        this.socket.emit('state', [this.state.pump.number, 'off']);
    }

    render() {
        return <div className="pumpControl">
            <p>Pump {this.state.pump.number}</p>
            <p><b>Fluid:</b> {this.state.pump.fluid}</p>
            <button className="btn btn-icon"
                onClick={(e) => this.onToggleOn(e)}
            >On!</button>
            <button className="btn btn-icon"
                onClick={(e) => this.onToggleOff(e)}
            >Off!</button>
            <UpdatePump number={this.state.pump.number} />

        </div>
    }
}

class UpdatePump extends Component {
    updateUser = event => {
        event.preventDefault();
        window.location.href = `/pumps/update/${this.props.number}`
    }

    render() {
        return (
            <button onClick={this.updateUser} className="btn btn-icon">
                <FontAwesomeIcon icon={['fas', 'edit']} style={{ color: 'white' }} />
            </button>
        )
    }
}
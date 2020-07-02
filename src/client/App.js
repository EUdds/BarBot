/* eslint-disable react/jsx-filename-extension */
import React, {Component} from 'react';
import io from 'socket.io-client';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.socket = io("http://127.0.0.1:7000");
  }

  onToggleOn = (event) => {
    event.stopPropagation();
    this.socket.emit('state', 'on');
  }

  onToggleOff = (event) => {
      event.stopPropagation();
      this.socket.emit('state', 'off');
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BarBotUI</h1>
        <button className="btn"
                onTouchStart={this.onToggleOn}
        >On!</button>
        <button className="btn"
                onTouchStart={this.onToggleOff}
        >Off!</button>
      </header>
    </div>
  )};
}

export default App;

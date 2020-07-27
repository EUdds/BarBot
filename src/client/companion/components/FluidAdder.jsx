import React from 'react';
import './FluidAdder.css';

class FluidAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fluid: this.props.name,
      inputName: this.props.name + "ing",
      numShots: 0,
    };
  }

  subShot = () => {
      if (this.state.numShots > 0)
      this.setState({numShots: this.state.numShots - 1})
  }

  addShot = () => {
      if (this.state.numShots < 10)
    this.setState({numShots: this.state.numShots + 1})
}

  render() {
    return (
        <div className="container">
            <input name={this.state.inputName} readOnly={true} value={this.state.numShots}> shot(s)</input>
            <p onClick={this.subShot}>-</p>
            <p>{this.state.fluid}</p>
            <p onClick={this.addShot}>+</p>
        </div>
    )
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default FluidAdder;

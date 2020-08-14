import React from 'react';
import './FluidAdder.css';

class FluidAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fluid: this.props.name,
      inputName: this.props.name + "ing",
      numShots: 0,
      onChange: this.props.onChange,
    };
  }

  handleChange = event => {
    const {fluid, numShots} = this.state;
    this.state.onChange(fluid, numShots);
  }

  subShot = () => {
      if (this.state.numShots > 0) {
        this.handleChange();
        this.setState({numShots: this.state.numShots - 1})
      }
  }

  addShot = () => {
      if (this.state.numShots < 10) {
        this.handleChange();
        this.setState({numShots: this.state.numShots + 1})
      }
}

  render() {
    let s = this.state.numShots > 1 ? "s" : "";
    let indicator;
    if (this.state.numShots > 0) {
      indicator = (<p>{this.state.numShots} shot{s}</p>)
    } else {
      indicator = (<p>N/A</p>)
    }
    return (
        <div className="container">
           {indicator}
            <p class="faButton" onClick={this.subShot}>-</p>
            <p>{this.state.fluid}</p>
            <p  class="faButton" onClick={this.addShot}>+</p>
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

import React from 'react';
import api from '../api';

import FluidAdder from '../components/FluidAdder';

class CreateDrink extends React.Component {
  constructor() {
    super();
    this.state = {
      fluids: [],
      drinkList: [],
      shotList: [],
    };
  }

  render() {
    return(
      <>
      <form onSubmit={this.onSubmit}> 
      <h1>Name your Drink</h1>
      <input type="text" />
      <h1> Assemble the Recipie</h1>
      <div>
      {this.state.fluids.map(fluid => (
        <FluidAdder name={fluid} />
        ))}
      </div>
      <button type="submit">Save</button>
      <button type="button">Make</button>
      <button type="button">Save and Make</button>
      </form> 
      </>
    )
  }

  componentDidMount() {
    api.getActiveFluids().then(res => {
      console.log(res);
      this.setState({fluids: res.data});
    })
  }
}

export default CreateDrink;

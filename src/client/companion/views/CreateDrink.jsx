import React from 'react';
import update from 'react-addons-update'
import api from '../api';
import FluidAdder from '../components/FluidAdder';
import './CreateDrink.css';

class CreateDrink extends React.Component {
  constructor() {
    super();
    this.state = {
      fluids: ['1', '2', '3','4', '5', '6', '7', '8'],
      drinkList: [],
      shotList: [],
      name: '',
    };
  }

  onChange = (fluid, amount) => {
    let idx = this.findFluidIndex(fluid);
    if (idx === -1) return; // TODO Error handling
    this.setState(update(this.state, {
      shotList: {
        [idx]: {
          $set: amount
        }
      }
    }));

  }

  onSubmit = () => {
    let payload = {};
    payload.name = this.state.name;
    payload.ingredients = [];
    let { fluids, shotList } = this.state;
    for (let i = 0; i < fluids.length; i++) {
      if (shotList[i] > 0) {
        let ingredient = {
          'name': fluids[i],
          'shots': shotList[i]
        }
        payload.ingredients.push(ingredient);
      }
    }
    api.insertDrink(payload);
    alert('Drink Saved!');
  }

  findFluidIndex(fluidName) {
    let { fluids } = this.state;
    for (let i = 0; i < fluids.length; i++) {
      if (fluids[i] === fluidName) {
        return i;
      }
    }
    return -1;
  }

  handleUpdateName = event => {
    this.setState({ name: event.target.value });
  }


  render() {
    return (
      <>
        <form class="createDrinkGrid" onSubmit={this.onSubmit}>
          <p>
            <h1>Name your Drink</h1>
            <input className="createInput" onChange={this.handleUpdateName} placeholder="Drink Name..." type="text" />
          </p>
          <p>
            <h1> Assemble the Recipie</h1>
            <div>
              {this.state.fluids.map(fluid => (
                <FluidAdder name={fluid} onChange={this.onChange} />
              ))}
            </div>
          </p>
    
          <p className="submitGrid">
            <button id="make" className="button disabled" type="button">Make</button>
            <button id="save" className="button" onClick={this.onSubmit} type="submit">Save</button>
            <button id="saveAndMake" className="button disabled" type="button">Save and Make</button>
          </p>
        </form>
      </>
    )
  }

  componentDidMount() {
    api.getActiveFluids().then(res => {
      console.log(res);
      let numFluids = res.data.length;
      this.setState({
        fluids: res.data,
        shotList: new Array(numFluids).fill(0)
      });
    })
  }
}

export default CreateDrink;

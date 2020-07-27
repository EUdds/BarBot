import React from 'react';
import api from '../api';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import LeftArrow from '../img/arrow-left.svg';
import RightArrow from '../img/arrow-right.svg';
import './ListDrinks.css';
import DrinkPicker from '../components/DrinkPicker';
class ListDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
      drink: null,
      currIdx: 0,
    };
  }

  async componentWillMount() {
    let fluids = await api.getActiveFluids();
    let possibleDrinks = await api.getDrinksByIngredients(fluids);
    this.setState({drinks: possibleDrinks, drink: possibleDrinks[0], currIdx: 0});

  }

  previousDrink() {

  }

  nextDrink() {

  }

  createDrink(event) {
    event.preventDefault();
    window.location.href = `/drinks/create`;
  }

  render() {
    return (
      <>
      <div className="menu">
        <p>
      <img height="50" width="50" src={LeftArrow} onClick={this.previousDrink()} />
        </p>
      <div>
        <DrinkPicker drink={this.state.drink} />
      </div>
      <p>
      <img height="50" width="50" src={RightArrow} onClick={this.nextDrink()} />
      </p>
      </div>
      <div>
        <button onClick={this.createDrink}>+</button>
      </div>
      </>
    )
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default ListDrinks;

import React from 'react';
import './DrinkPicker.css';

class DrinkPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currDrink: this.props.drink
        };
    }

    render() {
        let drinkName = (typeof this.props.drink == "undefined") ? "Loading" : this.props.drink.name;
        let ingredients = (typeof this.props.drink == "undefined") ? [{name: 'loading', shots: -1}] : this.props.drink.ingredients
        return (
            <div>
                    <h2 id="drinkTitle" className="capitalize">{drinkName}</h2>
                    <div className="list">
                        {ingredients.map(ingredient => (
                            <IngredientList ingredient={ingredient} />
                        ))}
                    </div>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            someKey: 'otherValue'
        });
    }
}

class IngredientList extends React.Component {
    constructor(props) {
        super(props);
    }

    titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    render() {
        let s = this.props.ingredient.shots === 1 ? '' : 's'; // Fuck you, yes I did this
        let name = this.titleCase(this.props.ingredient.name);
        return(
            <p>{this.props.ingredient.shots} Shot{s} of {name}</p>
        )
    }
}

export default DrinkPicker;

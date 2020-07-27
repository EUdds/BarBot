import React from 'react';

class DrinkPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currDrink: this.props.drink
        };
        if (this.props.drink == null) {
            this.setState({currDrink: {name: 'No Name Given', ingredients: ["None"]}})
        }
    }

    render() {
        return (
            <h2>Drink Name</h2>
        )
    }

    componentDidMount() {
        this.setState({
            someKey: 'otherValue'
        });
    }
}

export default DrinkPicker;

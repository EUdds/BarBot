import React from 'react';
import api from '../api';

class CreateFluid extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            isMixer: false,
            category: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleNameChange = event => {
        this.setState({name: event.target.value});
    }

    handleMixerChange = event => {
        this.setState({isMixer: event.target.checked});
    }

    handleCategoryChange = event => {
        this.setState({category: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let {name, isMixer, category} = this.state;
        let payload = {
            name: name,
            isMixer: isMixer,
            category: category
        }
        api.insertFluid(payload);
        alert('Ingredient Saved');
    }

    render() {
        return (
            <>
            <h1>Create New Ingredient</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Ingredient Name</label>
                <input onChange={this.handleNameChange} type="text" required={true} />
                <label>Is Mixer</label>
                <input onChange={this.handleMixerChange} type="checkbox" />
                <label>Category</label>
                <input onChange={this.handleCategoryChange} type="text" required={true} />
                <button type="submit">Create new Ingredient</button>
            </form>
            </>
        )
    }

    componentDidMount() {
        this.setState({
            someKey: 'otherValue'
        });
    }
}

export default CreateFluid;

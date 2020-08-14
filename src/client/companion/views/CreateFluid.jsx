import React from 'react';
import api from '../api';

import './CreateFluid.css'

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
        this.setState({ name: event.target.value });
    }

    handleMixerChange = event => {
        this.setState({ isMixer: event.target.checked });
    }

    handleCategoryChange = event => {
        this.setState({ category: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let { name, isMixer, category } = this.state;
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
                <div className="createFluidContainer">

                    <h1>Create New Ingredient</h1>
                    <form onSubmit={this.handleSubmit} className="fluidGrid">
                        <p>
                            <label>Ingredient Name</label>
                            <input className="createInput" onChange={this.handleNameChange} type="text" required={true} />
                        </p>
                        <p>
                            <label>Is Mixer</label>
                            <input onChange={this.handleMixerChange} type="checkbox" />
                        </p>
                        <p>
                            <label>Category</label>
                            <input className="createInput" onChange={this.handleCategoryChange} type="text" required={true} />
                        </p>
                        <button id="save" className="button" type="submit">Create new Ingredient</button>
                    </form>
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

export default CreateFluid;

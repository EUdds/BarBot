import React, {Component} from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class BackButton extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
                <Link to="/"><FontAwesomeIcon icon={['fas', 'home']} size="5x" style={{color: 'white'}} /></Link>
        )
    }
}
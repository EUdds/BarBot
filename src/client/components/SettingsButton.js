import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class SettingsButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Link to="/debugMenu"><FontAwesomeIcon icon={['fas', 'cog']} color="white" size="5x" /></Link>
  }

}

export default SettingsButton;

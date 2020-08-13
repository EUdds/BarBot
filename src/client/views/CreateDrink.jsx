import qrCode from '../img/createDrinkQR.svg';
import React from 'react';
const os = require('os');
const dns = require('dns');
class CreateDrink extends React.Component {
  constructor() {
    super();
    this.state = {
      ip: 'loading...'
    };
  }

  render() {
    return (
      <>
    <img height="35%" width="35%" src={qrCode} />
    <h2>Scan with your phone to go to the companion app</h2>
    </>
    )
  }

  componentDidMount() {
      let top = this;
    dns.lookup(os.hostname(), function (err, add, fam) {
        top.setState({ip: add});
    })
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default CreateDrink;

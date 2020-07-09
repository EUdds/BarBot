import React from 'react';
import api from '../api';

class PumpsUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pumpNumber: this.props.match.params.number,
      fluid: ''
    };
  }

  handleChangeInputFluid = async event => {
      const fluid = event.target.value;
      this.setState({fluid})
  }

  handleUpdatePump = async () => {
      const {pumpNumber, fluid} = this.state;
      const payload = {pumpNumber: pumpNumber, fluid: fluid}
        console.log('Changing fluid to ' + fluid);
      await api.updatePumpByPumpNumber(pumpNumber, payload).then(res => {
          console.log(res);
          window.alert('Pump Updated Sucessfully');
          this.setState({fluid: ''});
      });
  }

  componentWillMount = async () => {
      const {pumpNumber} = this.state;
      const pump = await api.getPumpByPumpNumber(pumpNumber);

      this.setState({
          pumpNumber: pumpNumber,
          fluid: pump.data.fluid
      });
  }

  render() {
    return (
        <>
        <input type="text" value={this.state.fluid} onChange={this.handleChangeInputFluid} />
        <button onClick={this.handleUpdatePump}>Update Pump</button>
        </>
    )
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

export default PumpsUpdate;

import React from 'react';
import api from '../api';
import './PumpUpdate.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import createFluidQR from '../img/createFluidQR.svg';

class PumpsUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pumpNumber: this.props.match.params.number,
            fluid: '',
            fluids: [],
            showAddModal: false
        };
    }

    handleUpdatePump = async (fluid) => {
        const {pumpNumber} = this.state;
        const payload = { pumpNumber: pumpNumber, fluid: fluid.name }
        console.log('Changing fluid to ' + fluid);
        await api.updatePumpByPumpNumber(pumpNumber, payload).then(res => {
            console.log(res);
            this.setState({ fluid: fluid});
            window.location.href = '/debugMenu';
        });
    }

    componentWillMount = async () => {
        const { pumpNumber } = this.state;
        await api.getPumpByPumpNumber(pumpNumber).then((pump) => {
            this.setState({
                pumpNumber: pumpNumber,
                fluid: pump.data.fluid
            });
        });
        await api.getAllFluids().then((fluids) => {
            this.setState({ fluids: fluids.data});
        })
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

    addNewDrink() {

    }

    showModal = () => {
        this.setState({showAddModal: true});
    }

    hideModal = () => {
        window.location.reload(true);
        this.setState({showAddModal: false});
    }

    render() {
        return (
            <div>
            <Header />
            <div className="mixerGrid">
                {this.state.fluids.map(fluid => (

                    <button name={fluid.name}
                        isMixer={fluid.isMixer}
                        category={fluid.category}
                        onClick={() => this.handleUpdatePump(fluid)}
                        className="mixerButton">
                        {this.titleCase(fluid.name)}
                    </button>
                ))}
                <Modal show={this.state.showAddModal} handleClose={this.hideModal}>
                    <img src={createFluidQR} height="250px" width="250px" />
                    <p>Scan to open the companion app</p>
                </Modal>
                <button onClick={this.showModal} className="mixerButton">
                    <FontAwesomeIcon icon={['fas', 'plus']} style={{color: 'white'}} />
                </button>
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

export default PumpsUpdate;

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
  };

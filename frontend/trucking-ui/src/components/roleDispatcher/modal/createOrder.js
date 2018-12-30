import React, {Component} from 'react';
import {
    Container,
    MDBRow,
    MDBCol,
    Animation,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBIcon,
    MDBInput,
    MDBContainer,
} from 'mdbreact';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Select from '@material-ui/core/Select';
import ValidationUtil from "../../../lib/validationUtil";
import {NotificationManager} from "react-notifications";

export default class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newOrderName: '',
            newOrderClient: '',
            newOrderStatus: '',
            newOrderSender: '',
            newOrderReceiver: '',
            newOrderDD: '2018-12-12',
            newOrderDA: '2018-12-13',
            newOrderAuto: '',
            newOrderDriver: '',
            selectedForm: 1,
            clients: [],
            stocks: [],
            autos: [],
            drivers: []
        };
    }

    componentDidMount() {
        this.loadInfo('/api/dispatcher/clients', 'clients');
        this.loadInfo('/api/dispatcher/stocks', 'stocks');
        this.loadInfo(`/api/dispatcher/freeAutos?dd=${this.state.newOrderDD}&&da=${this.state.newOrderDA}`, 'autos');
        this.loadInfo(`/api/dispatcher/freeDrivers?dd=${this.state.newOrderDD}&&da=${this.state.newOrderDA}`, 'drivers');
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    loadInfo = (url, id) => {
        fetch(url, {headers: {authorization: localStorage.getItem('authorization')}}).then(resp => {
            return resp.json();
        }).then(data => {
            this.setState({
                [id]: data
            })
        })
    };

    changeForm = (form) => {
        switch (form) {
            case 1:
                document.getElementById('first-form').style.display = '';
                document.getElementById('second-form').style.display = 'none';
                break;
            case 2:
                document.getElementById('first-form').style.display = 'none';
                document.getElementById('second-form').style.display = '';
                break;

        }
        this.setState({
            selectedForm: form
        });
    };

    changeInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    validateOrder = () => {
        this.changeForm(2);
        return true;

    };

    saveUser = () => {
        let ref = this;
        if (this.validateOrder) {

        } else {
            NotificationManager.warning("check your data");
        }
    };

    render() {
        console.log(this.state)
        return (
            <div className={'animated fadeIn'}>
                <Container>
                    <Button color="success" onClick={this.toggle}>Create order</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} size={'lg'}>
                        <ModalHeader toggle={this.toggle}>Create order: </ModalHeader>
                        <ModalBody>
                            <form>
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol md="">
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                                        <h3 className="my-3">
                                                            <MDBIcon icon="lock"/> Create order
                                                        </h3>
                                                    </MDBCardHeader>

                                                    <div id={'first-form'} className={'animated fadeIn'}>
                                                        <MDBInput
                                                            label="Name"
                                                            onChange={this.changeInput}
                                                            id={'newOrderName'}
                                                            value={this.state.newOrderName}
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                        <span className="error-span" id="error-email-span"/>
                                                        <label htmlFor="newOrderClient">Client</label>
                                                        <Select style={{width: '100%'}} id={'newOrderClient'}
                                                                native={true}
                                                                value={this.state.newOrderClient}
                                                                onChange={this.changeInput}>
                                                            {
                                                                this.state.clients.map((client, index) => {
                                                                    return <option value={client.id}
                                                                                   key={index}>{client.name}</option>
                                                                })
                                                            }
                                                        </Select>
                                                        <span className="error-span" id="error-username-span"/>
                                                        <label htmlFor="newOrderStatus">Status</label>
                                                        <Select style={{width: '100%'}} id={'newOrderStatus'}
                                                                native={true}
                                                                value={this.state.newOrderStatus}
                                                                onChange={this.changeInput}>
                                                            <option value={'1'}>Accepted</option>
                                                            <option value={'2'}>Checked</option>
                                                            <option value={'3'}>Lost</option>
                                                        </Select>
                                                        <span className="error-span" id="error-name-span"/>
                                                        <label htmlFor="newOrderSender">Sender</label>
                                                        <Select style={{width: '100%'}} id={'newOrderSender'}
                                                                native={true}
                                                                value={this.state.newOrderSender}
                                                                onChange={this.changeInput}>
                                                            {
                                                                this.state.stocks.map((stock, index) => {
                                                                    return <option value={stock.id}
                                                                                   key={index}>{stock.name}</option>
                                                                })
                                                            }
                                                        </Select>
                                                        <span className="error-span" id="error-surname-span"/>
                                                        <label htmlFor="newOrderReceiver">Receiver</label>
                                                        <Select style={{width: '100%'}} id={'newOrderReceiver'}
                                                                native={true}
                                                                value={this.state.newOrderReceiver}
                                                                onChange={this.changeInput}>
                                                            {
                                                                this.state.stocks.map((stock, index) => {
                                                                    return <option value={stock.id}
                                                                                   key={index}>{stock.name}</option>
                                                                })
                                                            }
                                                        </Select>
                                                        <span className="error-span" id="error-date-span"/>
                                                        <Button color="secondary"
                                                                onClick={this.validateOrder}>Continue</Button>
                                                    </div>

                                                    <div id="second-form" className={'animated fadeIn'}
                                                         style={{display: 'none'}}>
                                                        <MDBInput
                                                            label="Departure"
                                                            onChange={this.changeInput}
                                                            id={'newOrderDD'}
                                                            value={this.state.newOrderDD}
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                        <MDBInput
                                                            label="Arrival"
                                                            onChange={this.changeInput}
                                                            id={'newOrderDA'}
                                                            value={this.state.newOrderDA}
                                                            group
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                        <label htmlFor="newOrderAuto">Auto</label>
                                                        <Select style={{width: '100%'}} id={'newOrderAuto'}
                                                                native={true}
                                                                value={this.state.newOrderAuto}
                                                                onChange={this.changeInput}>
                                                            {
                                                                this.state.autos.map((auto, index) => {
                                                                    return <option value={auto.id}
                                                                                   key={index}>{auto.name}</option>
                                                                })
                                                            }
                                                        </Select>
                                                        <label htmlFor="newOrderDriver">Driver</label>
                                                        <Select style={{width: '100%'}} id={'newOrderDriver'}
                                                                native={true}
                                                                value={this.state.newOrderDriver}
                                                                onChange={this.changeInput}>
                                                            {
                                                                this.state.drivers.map((driver, index) => {
                                                                    return <option value={driver.id}
                                                                                   key={index}>{driver.name}</option>
                                                                })
                                                            }
                                                        </Select>


                                                        <Button color="secondary"
                                                                onClick={this.validateOrder}>Continue</Button>
                                                    </div>
                                                    {/*<Button color="secondary" onClick={this.changeForm(1)}>Back to order</Button>*/}



                                                    <Animation type="fadeIn" infinite>
                                                        <span id={'pass-span'} className="error-span"/>
                                                    </Animation>

                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
                            <Button color="primary" onClick={this.saveUser}>Create</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }

}
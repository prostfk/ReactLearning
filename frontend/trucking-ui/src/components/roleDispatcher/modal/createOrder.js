import React, { Component } from 'react';
import { Animation, MDBCardBody, MDBCardHeader, MDBIcon, MDBInput } from 'mdbreact';
import { Button } from 'reactstrap';
import Select from '@material-ui/core/Select';
import ValidationUtil from "../../../lib/validationUtil";
import { NotificationManager } from "react-notifications";

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
            newProductName: '',
            newProductPrice: '1',
            newProductCount: '1',
            newProductDescription: '',
            selectedForm: '1',
            clients: [],
            stocks: [],
            autos: [],
            drivers: [],
            consignment: []
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
        fetch(url, { headers: { authorization: localStorage.getItem('authorization') } }).then(resp => {
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

    addProduct = () => {
        let product = {
            name: this.state.newProductName,
            description: this.state.newProductDescription,
            count: this.state.newProductCount,
            price: this.state.newProductPrice
        };
        this.setState({
            consignment: [...this.state.consignment, product]
        });
    }

    deleteProduct(index){
        let newCons = [...this.state.consignment];
        if (index !== -1){
            newCons.splice(index,1);
            this.setState({
                consignment: newCons
            })
        }
    }

    validateFirstForm = () => {
        let clientIdValidation = ValidationUtil.validateForNumber(this.state.newOrderClient);
        let nameValidation = ValidationUtil.validateStringForLength(this.state.newOrderName, 3, 20);
        let stocksVal = this.state.newOrderSender !== this.state.newOrderReceiver;
        if (!clientIdValidation) {
            document.getElementById('error-client-span').innerText = "Choose client";
        } else {
            document.getElementById('error-client-span').innerText = "";
        }
        if (!nameValidation) {
            document.getElementById('error-name-span').innerText = `Incorrect value ${this.state.name}`;
        } else {
            document.getElementById('error-name-span').innerText = "";
        }
        if (!stocksVal) {
            document.getElementById('error-stocks-span').innerText = 'Choose different stocks';
        } else {
            document.getElementById('error-stocks-span').innerText = '';
        }
        return clientIdValidation && nameValidation && stocksVal;
    }

    validateOrder = () => {
        let sD = ValidationUtil.reformatFromDateToString(new Date(this.state.startDate));
        let eD = ValidationUtil.reformatFromDateToString(new Date(this.state.endDate));
        let clientIdValidation = ValidationUtil.validateForNumber(this.state.newOrderClient);
        let nameValidation = ValidationUtil.validateStringForLength(this.state.newOrderName, 3, 20);
        let dateArrivalValidation = ValidationUtil.validateDateToPattern(eD);
        let dateDepartureValidation = ValidationUtil.validateDateToPattern(sD);
        let correctDates = ValidationUtil.reformatDateToDateObject(eD) > ValidationUtil.reformatDateToDateObject(sD);
        let stocksVal = this.state.newOrderSender !== this.state.newOrderReceiver;
        let validateAuto = ValidationUtil.validateForNumber(this.state.newOrderAuto);
        let validateDriver = ValidationUtil.validateForNumber(this.state.newOrderDriver);
        if (!clientIdValidation) {
            document.getElementById('error-client-span').innerText = "Choose client";
        } else {
            document.getElementById('error-client-span').innerText = "";
        }
        if (!nameValidation) {
            document.getElementById('error-name-span').innerText = `Incorrect value ${this.state.name}`;
        } else {
            document.getElementById('error-name-span').innerText = "";
        }
        if (!dateArrivalValidation || !dateDepartureValidation || !correctDates) {
            document.getElementById('error-da-span').innerText = "Choose dates";
        } else {
            document.getElementById('error-da-span').innerText = "";
        }
        if (!validateAuto) {
            document.getElementById('error-auto-span').innerText = 'Choose auto';
        } else {
            document.getElementById('error-auto-span').innerText = '';
        }
        if (!validateDriver) {
            document.getElementById('error-driver-span').innerText = 'Choose driver';
        } else {
            document.getElementById('error-driver-span').innerText = '';
        }
        if (!stocksVal) {
            document.getElementById('error-stocks-span').innerText = 'Choose different stocks';
        } else {
            document.getElementById('error-stocks-span').innerText = '';
        }
        console.log(clientIdValidation && nameValidation && dateArrivalValidation && dateDepartureValidation && validateAuto && validateDriver && correctDates);
        console.log(clientIdValidation, nameValidation, dateArrivalValidation, dateDepartureValidation, validateAuto, validateDriver, correctDates);
        return clientIdValidation && nameValidation && dateArrivalValidation && dateDepartureValidation && validateAuto && validateDriver && correctDates;
    };

    saveUser = () => {
        let ref = this;
        if (this.validateOrder) {

        } else {
            NotificationManager.warning("check your data");
        }
    };

    render() {
        return (
            <div className={'animated fadeIn'}>

                <form className="container">
                    {/* <MDBContainer>
                        <MDBRow>
                            <MDBCol md="">
                                <MDBCard> */}
                    <MDBCardBody>
                        <MDBCardHeader className="form-header warm-flame-gradient rounded">
                            <h3 className="my-3">Create order</h3>
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
                            <span className="error-span" id="error-name-span" /><br />
                            <label htmlFor="newOrderClient">Client</label>
                            <Select style={{ width: '100%' }} id={'newOrderClient'}
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
                            <span className="error-span" id="error-client-span" /><br />
                            <label htmlFor="newOrderStatus">Status</label>
                            <Select style={{ width: '100%' }} id={'newOrderStatus'}
                                native={true}
                                value={this.state.newOrderStatus}
                                onChange={this.changeInput}>
                                <option value={'1'}>Accepted</option>
                                <option value={'2'}>Checked</option>
                                <option value={'3'}>Lost</option>
                            </Select>
                            <span className="error-span" id="error-status-span" /><br />
                            <label htmlFor="newOrderSender">Sender</label>
                            <Select style={{ width: '100%' }} id={'newOrderSender'}
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
                            <label htmlFor="newOrderReceiver">Receiver</label>
                            <Select style={{ width: '100%' }} id={'newOrderReceiver'}
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
                            <span className="error-span" id="error-stocks-span" /><br />
                            <Button color="secondary"
                                onClick={() => {
                                    if (this.validateFirstForm()) {
                                        this.changeForm(2);
                                    }
                                }}>Continue</Button>
                        </div>

                        <div id="second-form" className={'animated fadeIn'}
                            style={{ display: 'none' }}>
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
                            <span className="error-span" id="error-dd-span" /><br />

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
                            <span className="error-span" id="error-da-span" /><br />

                            <label htmlFor="newOrderAuto">Auto</label>
                            <Select style={{ width: '100%' }} id={'newOrderAuto'}
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
                            <span className="error-span" id="error-auto-span" /><br />

                            <label htmlFor="newOrderDriver">Driver</label>
                            <Select style={{ width: '100%' }} id={'newOrderDriver'}
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
                            <span className="error-span" id="error-driver-span" /><br />
                            <div id="third-form">
                                <div className="product-row">
                                    <MDBInput
                                        label="Name"
                                        onChange={this.changeInput}
                                        id={'newProductName'}
                                        value={this.state.newProductName}
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput
                                        label="Description"
                                        onChange={this.changeInput}
                                        id={'newProductDescription'}
                                        value={this.state.newProductDescription}
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput
                                        label="Count"
                                        onChange={this.changeInput}
                                        id={'newProductCount'}
                                        value={this.state.newProductCount}
                                        group
                                        type="number"
                                        validate
                                        error="wrong"
                                        success="right" />
                                    <MDBInput
                                        label="Price"
                                        onChange={this.changeInput}
                                        id={'newProductPrice'}
                                        value={this.state.newProductPrice}
                                        group
                                        type="number"
                                        validate
                                        error="wrong"
                                        success="right" />

                                    <button type="button" style={{ height: '50px' }} onClick={this.addProduct} className="btn btn-success">Add product</button>
                                </div>
                                {
                                    this.state.consignment.length > 0 ? <div>
                                        <div className="product-row animated fadeInUp" style={{ backgroundColor: '#DCDCDC' }}>
                                            <div className="col-md-2">Id</div>
                                            <div className="col-md-2">Name</div>
                                            <div className="col-md-2">Description</div>
                                            <div className="col-md-2">Count</div>
                                            <div className="col-md-2">Price</div>
                                            <div className="col-md-1">Remove</div>

                                        </div>
                                    </div> : <div />
                                }

                                <div style={{ maxHeight: '300px', 'overflowX': 'hidden', 'overflowY': 'scroll' }}>
                                    {
                                        this.state.consignment.map((product, index) => {
                                            return <div className="product-row animated fadeInUp" key={index} style={{ backgroundColor: 'white' }}>
                                                <div className="col-md-2">{index + 1}</div>
                                                <div className="col-md-2">{product.name}</div>
                                                <div className="col-md-2">{product.description}</div>
                                                <div className="col-md-2">{product.count}</div>
                                                <div className="col-md-2">{product.price}</div>
                                                <div className="col-md-1"><button className="table-button" style={{backgroundColor: '#F0AAAA'}} type="button" onClick={this.deleteProduct.bind(this,index)}>-</button></div>
                                            </div>
                                        })
                                    }
                                </div>


                            </div>

                            <Button color="secondary"
                                onClick={this.validateOrder}>Continue</Button>
                        </div>

                        {/*<Button color="secondary" onClick={this.changeForm(1)}>Back to order</Button>*/}



                        <Animation type="fadeIn" infinite>
                            <span id={'pass-span'} className="error-span" />
                        </Animation>

                    </MDBCardBody>
                    {/* </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer> */}
                </form>

            </div>
        );
    }

}
import React, {Component} from 'react';
import {Animation, MDBCardBody, MDBCardHeader, MDBIcon, MDBInput} from 'mdbreact';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {DatePicker} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import {Button} from 'reactstrap';
import Select from '@material-ui/core/Select';
import ValidationUtil from "../../../lib/validationUtil";
import {NotificationManager} from "react-notifications";
import CommonUtil from "../../../lib/commontUtil";

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
            newOrderDD: new Date(),
            newOrderDA: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
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
        this.loadInfo('/api/dispatcher/clients', 'clients', 'newOrderClient');
        this.loadInfo('/api/dispatcher/stocks', 'stocks', 'stock');
        this.loadInfo(`/api/dispatcher/freeAutos?dd=${CommonUtil.dateToString(this.state.newOrderDD)}&&da=${CommonUtil.dateToString(this.state.newOrderDA)}`, 'autos', 'newOrderAuto');
        this.loadInfo(`/api/dispatcher/freeDrivers?dd=${CommonUtil.dateToString(this.state.newOrderDD)}&&da=${CommonUtil.dateToString(this.state.newOrderDA)}`, 'drivers', 'newOrderDriver');
    }

    loadInfo = (url, id, singleId = undefined) => {
        fetch(url, {headers: {authorization: localStorage.getItem('authorization')}}).then(resp => {
            return resp.json();
        }).then(data => {
            if (singleId) {
                if (singleId === 'stock'){
                    this.setState({
                        newOrderReceiver: data[0].id,
                        newOrderSender: data[0].id
                    });
                }
                this.setState({
                    [singleId]: data[0].id
                });
            }
            this.setState({
                [id]: data
            });
        })
    };

    changeForm = (form) => {
        switch (form) {
            case 1:
                document.getElementById('first-form').style.display = '';
                document.getElementById('second-form').style.display = 'none';
                document.getElementById('third-form').style.display = 'none';
                break;
            case 2:
                document.getElementById('first-form').style.display = 'none';
                document.getElementById('second-form').style.display = '';
                document.getElementById('third-form').style.display = 'none';
                break;
            case 3:
                document.getElementById('first-form').style.display = 'none';
                document.getElementById('second-form').style.display = 'none';
                document.getElementById('third-form').style.display = '';
                break;
        }
        this.setState({
            selectedForm: form
        });
    };

    changeDate = (id, date) => {
        this.setState({
            [id]: date
        });
    };

    changeInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(this.state);
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
        document.getElementById('newProductName').focus();

    };

    deleteProduct(index) {
        let newCons = [...this.state.consignment];
        if (index !== -1) {
            newCons.splice(index, 1);
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
    };

    validateOrder = () => {
        let clientIdValidation = ValidationUtil.validateForNumber(this.state.newOrderClient);
        let nameValidation = ValidationUtil.validateStringForLength(this.state.newOrderName, 3, 20);
        let correctDates = this.state.newOrderDD.getTime() < this.state.newOrderDA.getTime();
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
        if (!correctDates) {
            document.getElementById('error-dates-span').innerText = "Incorrect dates";
        } else {
            document.getElementById('error-dates-span').innerText = "";
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
        return clientIdValidation && nameValidation && validateAuto && validateDriver && correctDates;
    };

    saveOrder = () => {
        let ref = this;
        if (this.validateOrder) {
            const formData = new FormData();
            formData.append('name', this.state.newOrderName);
            formData.append('client', this.state.newOrderClient);
            formData.append('auto', this.state.newOrderAuto);
            formData.append('driver', this.state.newOrderDriver);
            formData.append('sender', this.state.newOrderSender);
            formData.append('receiver', this.state.newOrderReceiver);
            formData.append('dd', CommonUtil.dateToString(this.state.newOrderDD));
            formData.append('da', CommonUtil.dateToString(this.state.newOrderDA));
            formData.append('status', this.state.newOrderStatus);
            formData.append('consignment', JSON.stringify(this.state.consignment));
            fetch('/api/dispatcher/addOrder', {
                method: 'post',
                headers: {authorization: localStorage.getItem('authorization')},
                body: formData
            }).then(resp => {
                return resp.json();
            }).then(data => {
                console.log(data);
            }).catch((err) => {
                NotificationManager.warning(err);
            })
        } else {
            NotificationManager.warning("check your data");
        }
    };

    setDefault = () => {
        this.setState({
            newOrderStatus: document.getElementById('newOrderStatus'),
            newOrderSender: document.getElementById('newOrderSender'),
            newOrderReceiver: document.getElementById('newOrderReceiver'),
            newOrderAuto: document.getElementById('newOrderAuto'),
            newOrderDriver: document.getElementById('newOrderDriver')
        })
    };

    render() {
        return (
            <div className={'animated fadeIn'}>

                <form className="container">
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
                            <span className="error-span" id="error-name-span"/><br/>
                            <label htmlFor="newOrderClient">Client</label>
                            <Select style={{width: '100%'}} id={'newOrderClient'}
                                    native={true}
                                    value={this.state.newOrderClient}
                                    onChange={this.changeInput}>
                                {/*<option disabled selected>Client</option>*/}
                                {
                                    this.state.clients.map((client, index) => {
                                        return <option value={client.id}
                                                       key={index}>{client.name}</option>
                                    })
                                }
                            </Select>
                            <span className="error-span" id="error-client-span"/><br/>
                            <label htmlFor="newOrderStatus">Status</label>
                            <Select style={{width: '100%'}} id={'newOrderStatus'}
                                    native={true}
                                    value={this.state.newOrderStatus}
                                    onChange={this.changeInput}>
                                <option value={'1'}>Accepted</option>
                                <option value={'2'}>Checked</option>
                                <option value={'3'}>Lost</option>
                            </Select>
                            <span className="error-span" id="error-status-span"/><br/>
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
                            <span className="error-span" id="error-stocks-span"/><br/>
                            <Button color="secondary"
                                    onClick={() => {
                                        // this.setDefault();
                                        if (this.validateFirstForm()) {
                                            this.changeForm(2);
                                        }
                                    }}>Continue</Button>
                        </div>

                        <div id="second-form" className={'animated fadeIn'}
                             style={{display: 'none'}}>
                            <label htmlFor="dates">Dates</label>

                            <div id="dates" style={{display: 'flex', justifyContent: 'center'}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker id={'newOrderDD'} value={this.state.newOrderDD}
                                                onChange={(e) => this.changeDate('newOrderDD', e)}/>
                                    <DatePicker id={'newOrderDA'} value={this.state.newOrderDA}
                                                onChange={(e) => this.changeDate('newOrderDA', e)}/>

                                </MuiPickersUtilsProvider>
                            </div>

                            <span className="error-span" id="error-dates-span"/><br/>

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
                            <span className="error-span" id="error-auto-span"/><br/>

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
                            <span className="error-span" id="error-driver-span"/><br/>

                            <button className={'btn btn-primary'} type={'button'}
                                    onClick={() => this.changeForm(1)}>Back to order
                            </button>

                            <Button color="secondary"
                                    onClick={() => {
                                        // this.setDefault();
                                        if (this.validateOrder()) {
                                        this.changeForm(3);
                                        }
                                    }}>Continue</Button>
                        </div>

                        <div id="third-form" style={{display: 'none'}}>
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
                                    success="right"/>
                                <MDBInput
                                    label="Description"
                                    onChange={this.changeInput}
                                    id={'newProductDescription'}
                                    value={this.state.newProductDescription}
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"/>
                                <MDBInput
                                    label="Count"
                                    onChange={this.changeInput}
                                    id={'newProductCount'}
                                    value={this.state.newProductCount}
                                    group
                                    type="number"
                                    validate
                                    error="wrong"
                                    success="right"/>
                                <MDBInput
                                    label="Price"
                                    onChange={this.changeInput}
                                    id={'newProductPrice'}
                                    value={this.state.newProductPrice}
                                    group
                                    type="number"
                                    validate
                                    error="wrong"
                                    success="right"/>

                                <button type="button" style={{height: '50px'}} onClick={this.addProduct}
                                        className="btn btn-success">Add product
                                </button>
                            </div>
                            {
                                this.state.consignment.length > 0 ? <div>
                                    <div className="product-row animated fadeInUp" style={{backgroundColor: '#DCDCDC'}}>
                                        <div className="col-md-2">Id</div>
                                        <div className="col-md-2">Name</div>
                                        <div className="col-md-2">Description</div>
                                        <div className="col-md-2">Count</div>
                                        <div className="col-md-2">Price</div>
                                        <div className="col-md-1">Remove</div>

                                    </div>
                                </div> : <div/>
                            }

                            <div style={{maxHeight: '300px', 'overflowX': 'hidden', 'overflowY': 'scroll'}}>
                                {
                                    this.state.consignment.map((product, index) => {
                                        return <div className="product-row animated fadeInUp" key={index}
                                                    style={{backgroundColor: 'white'}}>
                                            <div className="col-md-2">{index + 1}</div>
                                            <div className="col-md-2">{product.name}</div>
                                            <div className="col-md-2">{product.description}</div>
                                            <div className="col-md-2">{product.count}</div>
                                            <div className="col-md-2">{product.price}</div>
                                            <div className="col-md-1">
                                                <MDBIcon icon="remove" style={{color: 'red'}}
                                                         onClick={this.deleteProduct.bind(this, index)}/>
                                                {/*<button className="table-button" style={{backgroundColor: '#F0AAAA'}} type="button" */}
                                                {/*onClick={this.deleteProduct.bind(this,index)}>-</button>*/}
                                            </div>
                                        </div>
                                    })
                                }
                            </div>

                            <button className={'btn btn-primary'} type={'button'}
                                    onClick={() => this.changeForm(2)}>Back to waybill
                            </button>
                            <button className={'btn btn-success'} onClick={this.saveOrder} type={'button'}>Create
                            </button>

                        </div>


                        <Animation type="fadeIn" infinite>
                            <span id={'pass-span'} className="error-span"/>
                        </Animation>

                    </MDBCardBody>
                </form>

            </div>
        );
    }

    getPickerValue = (value) => {
        console.log(value);
    }

}
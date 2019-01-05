import React, {Component} from 'react';
import {
    Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBRow, MDBCol,
    MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBInput, Animation, MDBContainer
} from 'mdbreact';
import Select from '@material-ui/core/Select';
import ValidationUtil from "../../../lib/validationUtil";
import {NotificationManager} from "react-notifications";

export default class CreateStock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newStockName: '',
            newStockAddress: '',
            newStockLat: '',
            newStockLng: ''
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    changeInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    validateUser = () => {
        let nameVal = ValidationUtil.validateStringForLength(this.state.newAutoName, 3, 49);
        let typeVal = ValidationUtil.validateStringForLength(this.state.newAutoType, 5, 19);
        let carNumberVal = ValidationUtil.validateStringForLength(this.state.newAutoNumber, 3, 20);
        let fuelVal = ValidationUtil.validateNumberInTheRage(this.state.newAutoFuel, 2, 50);
        if (!typeVal){
            document.getElementById('newAutoType').classList.add('is-invalid');
            document.getElementById('error-type-span').innerText = 'Type is incorrect';
        }else{
            document.getElementById('newAutoType').classList.remove("is-invalid");
            document.getElementById('error-type-span').innerText = '';
        }
        if (!carNumberVal) {
            document.getElementById('newAutoNumber').classList.add("is-invalid");
            document.getElementById('error-number-span').innerText = 'Car number length must be between 3 and 20 characters';
        } else {
            document.getElementById('newAutoNumber').classList.remove("is-invalid");
            document.getElementById('error-number-span').innerText = '';
        }
        if (!fuelVal) {
            document.getElementById('newAutoFuel').classList.add("is-invalid");
            document.getElementById('error-fuel-span').innerText = 'Fuel consumption must be between 2 and 50';
        } else {
            document.getElementById('newAutoFuel').classList.remove("is-invalid");
            document.getElementById('error-fuel-span').innerText = '';
        }
        if (!nameVal) {
            document.getElementById('newAutoName').classList.add("is-invalid");
            document.getElementById('error-name-span').innerText = 'Name must be between 3 and 39 characters.';
        } else {
            document.getElementById('newAutoName').classList.remove("is-invalid");
            document.getElementById('error-name-span').innerText = '';
        }
        return nameVal && carNumberVal && typeVal && fuelVal;
    };


    saveStock = () => {
        let ref = this;
        if (this.validateUser()) {
            let formData = new FormData();
            formData.append('name', this.state.newStockName);
            formData.append('address', this.state.newStockAddress);
            formData.append('lat', this.state.newStockLat);
            formData.append('lng', this.state.newStockLng);
            fetch('/api/admin/addStock', {body: formData, method: 'post', headers:{authorization: localStorage.getItem('authorization')}}).then(response=>{
                return response.json();
            }).then(data=>{
                if (data.error === undefined){
                    ref.props.renderStocks();
                    this.toggle();
                    NotificationManager.success('Auto added');
                }else{
                    NotificationManager.error(data.error);
                }
            })
        } else {
            NotificationManager.error('Check data');
        }
    };

    render() {
        return (
            <div className={'animated fadeIn'}>
                <Container>
                    <Button color="success" onClick={this.toggle}>Create auto</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            <form>
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol md="">
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                                        <h3 className="my-3">
                                                            <MDBIcon icon="lock"/> Add new auto
                                                        </h3>
                                                    </MDBCardHeader>
                                                    <MDBInput
                                                        label="Name"
                                                        onChange={this.changeInput}
                                                        id={'newStockName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-name-span"/>
                                                    <MDBInput
                                                        label="Address"
                                                        onChange={this.changeInput}
                                                        id={'newStockAddress'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-number-span"/>
                                                    <MDBInput
                                                        label="Fuel consumption"
                                                        onChange={this.changeInput}
                                                        id={'newAutoFuel'}
                                                        group
                                                        type="number"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-fuel-span"/>

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
                            <Button color="primary" onClick={this.saveStock}>Add Auto</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }

}
import React, {Component} from 'react';
import {
    Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBRow, MDBCol,
    MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBInput, Animation, MDBContainer
} from 'mdbreact';
import Select from '@material-ui/core/Select';
import ValidationUtil from "../../../lib/validationUtil";
import {NotificationManager} from "react-notifications";

export default class CreateAuto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newAutoName: '',
            newAutoNumber: '',
            newAutoType: 'Hatchback',
            newAutoFuel: ''
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


    saveAuto = () => {
        let ref = this;
        console.log(this.state);
        if (this.validateUser()) {
            let formData = new FormData();
            formData.append('name', this.state.newAutoName);
            formData.append('fuel', this.state.newAutoFuel);
            formData.append('number', this.state.newAutoNumber);
            formData.append('type', this.state.newAutoType);
            fetch('/api/admin/addAuto', {body: formData, method: 'post', headers:{authorization: localStorage.getItem('authorization')}}).then(response=>{
                return response.json();
            }).then(data=>{
                if (data.error === undefined){
                    this.toggle();
                    ref.props.renderAutos();
                    NotificationManager.success(data.status);
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
                                                        id={'newAutoName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-name-span"/>
                                                    <MDBInput
                                                        label="Car number"
                                                        onChange={this.changeInput}
                                                        id={'newAutoNumber'}
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
                                                    <Select style={{width: '100%'}} id={'newAutoType'} native={true}
                                                            value={this.state.newAutoType}
                                                            onChange={this.changeInput}>
                                                        <option value={'Hatchback'}>Hatchback</option>
                                                        <option value={'Sedan'}>Sedan</option>
                                                        <option value={'MPV'}>MPV</option>
                                                        <option value={'SUV'}>SUV</option>
                                                        <option value={'Crossover'}>Crossover</option>
                                                        <option value={'Coupe'}>Coupe</option>
                                                        <option value={'Convertible'}>Convertible</option>
                                                    </Select>
                                                    <span className="error-span" id="error-type-span"/>

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
                            <Button color="primary" onClick={this.saveAuto}>Add Auto</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }

}
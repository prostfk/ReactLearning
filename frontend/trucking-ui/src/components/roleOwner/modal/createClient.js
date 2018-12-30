import React, {Component} from 'react';
import {
    Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBRow, MDBCol,
    MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBInput, Animation, MDBContainer
} from 'mdbreact';
import Select from '@material-ui/core/Select';
import ValidationUtil from "../../../lib/validationUtil";
import {NotificationManager} from "react-notifications";

export default class CreateClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newClientName: '',
            newClientType: ''
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

    validateClient = () => {
        let val =  ValidationUtil.validateStringForLength(this.state.newClientName, 3, 20);
        if (!val){
            document.getElementById('newClientName').classList.add('is-invalid');
            document.getElementById('error-name-span').innerText = 'Name is incorrect';
        }else{
            document.getElementById('newClientName').classList.remove("is-invalid");
            document.getElementById('error-name-span').innerText = '';
        }
        return val;
    };

    saveClient = () => {
        let ref = this;
        if (this.validateClient()) {
            let formData = new FormData();
            formData.append('name', this.state.newClientName);
            formData.append('type', this.state.newClientType);
            fetch('/api/owner/addClient', {body: formData, method: 'post', headers:{authorization: localStorage.getItem('authorization')}}).then(response=>{
                return response.json();
            }).then(data=>{
                if (data.error === undefined){
                    ref.props.renderClients();
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
                                                            <MDBIcon icon="lock"/> Add new client
                                                        </h3>
                                                    </MDBCardHeader>
                                                    <MDBInput
                                                        label="Name"
                                                        onChange={this.changeInput}
                                                        id={'newClientName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-name-span"/>
                                                    <Select style={{width: '100%'}} id={'newClientType'} native={true}
                                                            value={this.state.newClientType}
                                                            onChange={this.changeInput}>
                                                        <option value={'The Know-Nothing Client'}>The Know-Nothing Client</option>
                                                        <option value={'The Know-Everything Client'}>The Know-Everything Client</option>
                                                        <option value={'The Wannabe Client'}>The Wannabe Client</option>
                                                        <option value={'The Bargain Basement Client'}>The Bargain Basement Client</option>
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
                            <Button color="primary" onClick={this.saveClient}>Add Client</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }

}
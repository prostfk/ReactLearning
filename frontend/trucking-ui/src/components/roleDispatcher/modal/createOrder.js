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
            newOrderName: 'ROLE_ADMIN',
            newOrderClient: '',
            newOrderStatus: '',
            newOrderSender: '',
            newOrderReceiver: '',
            newOrderDD: '',
            newOrderDA: '',
            selectedForm: 1,
            clients: []
        };
    }

    componentDidMount(){
        this.loadClients();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    loadClients = () => {
        fetch('/api/dispatcher/clients', {headers: {authorization: localStorage.getItem('authorization')}}).then(resp=>{
            return resp.json();
        }).then(data=>{
            this.setState({
                clients: data
            });
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
        return (
            <div className={'animated fadeIn'}>
                <Container>
                    <Button color="success" onClick={this.toggle}>Create order</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} size={'fluid'}>
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

                                                    <div id={'first-form'}>
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
                                                        <Select style={{width: '100%'}} id={'newOrderClient'} native={true}
                                                                value={this.state.newOrderClient}
                                                                onChange={this.changeInput}>
                                                            {
                                                                this.state.clients.map((client, index)=>{
                                                                    return <option value={client.id} key={index}>{client.name}</option>
                                                                })
                                                            }
                                                        </Select>
                                                        <span className="error-span" id="error-username-span"/>
                                                        <label htmlFor="newOrderStatus">Status</label>
                                                        <Select style={{width: '100%'}} id={'newOrderStatus'} native={true}
                                                                value={this.state.newOrderStatus}
                                                                onChange={this.changeInput}>
                                                            <option value={'1'}>Accepted</option>
                                                            <option value={'2'}>Checked</option>
                                                            <option value={'3'}>Lost</option>
                                                        </Select>
                                                        <span className="error-span" id="error-name-span"/>
                                                        <label htmlFor="newOrderSender">Sender</label>
                                                        <Select style={{width: '100%'}} id={'newOrderSender'} native={true}
                                                                value={this.state.newOrderSender}
                                                                onChange={this.changeInput}>
                                                        </Select>
                                                        <span className="error-span" id="error-surname-span"/>
                                                        <label htmlFor="newOrderReceiver">Receiver</label>
                                                        <Select style={{width: '100%'}} id={'newOrderReceiver'} native={true}
                                                                value={this.state.newOrderReceiver}
                                                                onChange={this.changeInput}>
                                                        </Select>
                                                        <span className="error-span" id="error-date-span"/>
                                                        <Button color="secondary" onClick={this.validateOrder}>Continue</Button>
                                                    </div>

                                                    <div id="second-form" style={{display: 'none'}}>
                                                        <Select style={{width: '100%'}} id={'newUserRole'} native={true}
                                                                value={this.state.newUserRole}
                                                                onChange={this.changeInput}>
                                                            <option value={'ROLE_ADMIN'}>Admin</option>
                                                            <option value={'ROLE_DRIVER'}>Driver</option>
                                                            <option value={'ROLE_MANAGER'}>Manager</option>
                                                            <option value={'ROLE_DISPATCHER'}>Dispatcher</option>
                                                        </Select>
                                                        <div style={this.state.newUserRole === 'ROLE_DRIVER' ?
                                                            {display: ''} : {display: 'none'}
                                                        }>
                                                            <MDBInput
                                                                label="Passport number"
                                                                onChange={this.changeInput}
                                                                value={this.state.newUserPassport}
                                                                id={'newUserPassport'}
                                                                group
                                                                type="text"
                                                                validate
                                                                error="wrong"
                                                                success="right"
                                                            />
                                                        </div>
                                                        {/*<Button color="secondary" onClick={this.changeForm(1)}>Back to order</Button>*/}
                                                        <Button color="secondary" onClick={this.validateOrder}>Continue</Button>

                                                    </div>




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
                            <Button color="primary" onClick={this.saveUser}>Add user</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            </div>
        );
    }

}
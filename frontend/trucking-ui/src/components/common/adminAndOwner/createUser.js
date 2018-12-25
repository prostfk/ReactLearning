import React, {Component} from 'react';
import {
    Container,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody, MDBCardHeader, MDBIcon, MDBInput, Animation, MDBBtn, MDBContainer
} from 'mdbreact';


export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    validateUser = () => {
        return true;
    };

    saveUser = () => {
        if (this.validateUser){
            let formData = new FormData();
            fetch('http://localhost:3001/addUser', {method: 'post', body: formData, headers: {'Auth-token': localStorage.getItem('Auth-token')}}).then(response=>{
                return response.json();
            }).then(data=>{
                if (data.error === undefined){
                    this.props.renderUsers();
                }
            })
        }
    };

    render() {
        return (
            <div>
                <Container>
                    <Button color="success" onClick={this.toggle}>Create user</Button>
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
                                                            <MDBIcon icon="lock"/> Registration
                                                        </h3>
                                                    </MDBCardHeader>
                                                    <MDBInput
                                                        label="Company name"
                                                        onChange={this.changeInput}
                                                        id={'companyName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        label="Email"
                                                        onChange={this.changeInput}
                                                        id={'email'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        label="username"
                                                        onChange={this.changeInput}
                                                        id={'username'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        label="First name"
                                                        onChange={this.changeInput}
                                                        id={'firstName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        label="Second name"
                                                        onChange={this.changeInput}
                                                        id={'secondName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        // label="Birth date"
                                                        onChange={this.changeInput}
                                                        id={'birthDay'}
                                                        group
                                                        type="date"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        label="Password"
                                                        onChange={this.changeInput}
                                                        id={'password'}
                                                        group
                                                        type="password"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <MDBInput
                                                        label="Password again"
                                                        onChange={this.changeInput}
                                                        id={'passwordAgain'}
                                                        group
                                                        type="password"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
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
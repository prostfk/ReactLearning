import React, {Component} from 'react';
import {
    Container, Button, Modal, ModalBody, ModalHeader, ModalFooter, MDBRow, MDBCol, Animation,
    MDBCard, MDBCardBody, MDBCardHeader, MDBIcon, MDBInput, MDBContainer,
} from 'mdbreact';
import ValidationUtil from "../../../lib/validationUtil";
import {NotificationManager} from "react-notifications";
import $ from "jquery";
import {Input} from 'reactstrap';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "material-ui-pickers";

export default class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newUserRole: 'ROLE_ADMIN',
            newUserEmail: '',
            newUserUsername: '',
            newUserPassword: '',
            newUserPasswordAgain: '',
            newUserBirthDate: new Date(),
            newUserFirstName: '',
            newUserSecondName: '',
            newUserPassport: '',
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
        let emailVal = ValidationUtil.validateEmailForPattern(this.state.newUserEmail);
        let userNameVal = ValidationUtil.validateStringForLength(this.state.newUserUsername, 5, 20);
        let passwordVal = ValidationUtil.validateStringForLength(this.state.newUserPassword, 6, 20);
        let dateVal = true;//ValidationUtil.validateDateForNotThisYear(this.state.newUserBirthDate);
        let nameVal = ValidationUtil.validateStringForLength(this.state.newUserFirstName, 2, 40);
        let surnameVal = ValidationUtil.validateStringForLength(this.state.newUserSecondName, 4, 40);
        let passportVal = this.state.newUserRole === 'ROLE_DRIVER' ? ValidationUtil.validateStringForLength(this.state.newUserPassport, 5, 20) : true;
        if (!emailVal) {
            document.getElementById('newUserEmail').classList.add('is-invalid');
            document.getElementById('error-email-span').innerText = 'Email is incorrect';
        } else {
            document.getElementById('newUserEmail').classList.remove("is-invalid");
            document.getElementById('error-email-span').innerText = '';
        }
        if (!userNameVal) {
            document.getElementById('newUserUsername').classList.add("is-invalid");
            document.getElementById('error-username-span').innerText = 'Username must be between 5 and 20 characters';
        } else {
            document.getElementById('newUserUsername').classList.remove("is-invalid");
            document.getElementById('error-username-span').innerText = '';
        }
        if (!passwordVal && this.state.password === this.state.passwordAgain) {
            document.getElementById('newUserPassword').classList.add("is-invalid");
            document.getElementById('error-password-span').innerText = 'Password must be between 6 and 20 characters.';
        } else {
            document.getElementById('newUserPassword').classList.remove("is-invalid");
            document.getElementById('error-password-span').innerText = '';
        }
        if (!dateVal) {
            document.getElementById('newUserBirthDate').classList.add("is-invalid");
            document.getElementById('error-date-span').innerText = 'Check date of birth (dd / mm / yyyy)';
        } else {
            document.getElementById('newUserBirthDate').classList.remove("is-invalid");
            document.getElementById('error-date-span').innerText = '';
        }
        if (!nameVal) {
            document.getElementById('newUserFirstName').classList.add("is-invalid");
            document.getElementById('error-name-span').innerText = 'Name must be between 2 and 40 characters.';
        } else {
            document.getElementById('newUserFirstName').classList.remove("is-invalid");
            document.getElementById('error-name-span').innerText = '';
        }
        if (!surnameVal) {
            document.getElementById('newUserSecondName').classList.add("is-invalid");
            document.getElementById('error-surname-span').innerText = 'Last name must be between 4 and 40 characters';
        } else {
            document.getElementById('newUserSecondName').classList.remove("is-invalid");
            document.getElementById('error-surname-span').innerText = '';
        }
        if (!passportVal) {
            document.getElementById('newUserPassport').classList.add("is-invalid");
            document.getElementById('error-passport-span').innerText = 'From 5 to 20 chars';
        } else {
            document.getElementById('newUserPassport').classList.remove("is-invalid");
            document.getElementById('error-passport-span').innerText = '';
        }
        return emailVal && userNameVal && passwordVal && dateVal && nameVal && surnameVal && passportVal;
    };


    saveUser = () => {
        let ref = this;
        if (this.validateUser()) {
            let formData = new FormData();
            formData.append('email', this.state.newUserEmail);
            formData.append('username', this.state.newUserUsername);
            formData.append('role', this.state.newUserRole);
            formData.append('password', this.state.newUserPassword);
            formData.append('birth_day', this.state.newUserBirthDate);
            formData.append('name', this.state.newUserFirstName);
            formData.append('surname', this.state.newUserSecondName);
            formData.append('passport', this.state.newUserPassport);
            fetch('/api/ownerAndAdmin/addUser', {
                body: formData,
                method: 'post',
                headers: {authorization: localStorage.getItem('authorization')}
            }).then(response => {
                return response.json();
            }).then(data => {
                if (data.error === undefined) {
                    ref.props.renderUsers();
                    this.toggle();
                    NotificationManager.success(data.status);
                } else {
                    NotificationManager.error(data.error);
                }
            })
        } else {
            NotificationManager.warn("check your data");
        }
    };

    changeDate = (id, date) => {
        this.setState({
            [id]: date
        });
    };

    render() {
        return (
            <div className={'animated fadeIn'}>
                <Container>
                    <Button color="success" onClick={this.toggle}>Create user</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader className={'stylish-color-dark'} toggle={this.toggle} style={{color: 'white'}}>Create user</ModalHeader>
                        <ModalBody className={'stylish-color-dark'}>
                            <form>
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol md="">
                                            <div className={'stylish-color-dark'}
                                                 style={{borderRadius: '5px', margin: '0 1% 0 1%'}}>
                                                <MDBCardBody>
                                                    <MDBInput
                                                        label="Email"
                                                        onChange={this.changeInput}
                                                        id={'newUserEmail'}
                                                        group
                                                        style={{color: 'white'}}
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-email-span"/>
                                                    <MDBInput
                                                        label="Username"
                                                        onChange={this.changeInput}
                                                        id={'newUserUsername'}
                                                        group
                                                        style={{color: 'white'}}
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-username-span"/>
                                                    <MDBInput
                                                        label="First name"
                                                        onChange={this.changeInput}
                                                        id={'newUserFirstName'}
                                                        group
                                                        style={{color: 'white'}}
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-name-span"/>
                                                    <MDBInput
                                                        label="Second name"
                                                        onChange={this.changeInput}
                                                        id={'newUserSecondName'}
                                                        group
                                                        style={{color: 'white'}}
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-surname-span"/>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <DatePicker id={'newUserBirthDate'} value={this.state.newUserBirthDate}
                                                                    style={{width: '100%', color: 'white'}}
                                                                    onChange={(e) => this.changeDate('newUserBirthDate', e)}/>
                                                    </MuiPickersUtilsProvider>
                                                    <span className="error-span" id="error-date-span"/>
                                                    <MDBInput
                                                        label="Password"
                                                        onChange={this.changeInput}
                                                        id={'newUserPassword'}
                                                        group
                                                        style={{color: 'white'}}
                                                        type="password"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-password-span"/>
                                                    <MDBInput
                                                        label="Password again"
                                                        onChange={this.changeInput}
                                                        id={'newUserPasswordAgain'}
                                                        group
                                                        style={{color: 'white'}}
                                                        type="password"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-again-password-span"/>
                                                    <Input type={'select'} style={{width: '100%', color: 'white', border: '0px solid'}} id={'newUserRole'}
                                                           className={'stylish-color-dark'}
                                                           value={this.state.newUserRole}
                                                           onChange={this.changeInput}>
                                                        <option value={'ROLE_ADMIN'}>Admin</option>
                                                        <option value={'ROLE_DRIVER'}>Driver</option>
                                                        <option value={'ROLE_MANAGER'}>Manager</option>
                                                        <option value={'ROLE_DISPATCHER'}>Dispatcher</option>
                                                    </Input>
                                                    <div style={this.state.newUserRole === 'ROLE_DRIVER' ?
                                                        {display: ''} : {display: 'none'}
                                                    }>
                                                        <MDBInput
                                                            label="Passport number"
                                                            onChange={this.changeInput}
                                                            id={'newUserPassport'}
                                                            group
                                                            style={{color: 'white'}}
                                                            type="text"
                                                            validate
                                                            error="wrong"
                                                            success="right"
                                                        />
                                                    </div>

                                                    <span className="error-span" id="error-passport-span"/>
                                                    <Animation type="fadeIn" infinite>
                                                        <span id={'pass-span'} className="error-span"/>
                                                    </Animation>

                                                </MDBCardBody>
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </form>
                            <div className={'stylish-color-dark'}>
                                <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
                                <Button color="primary" onClick={this.saveUser}>Add user</Button>
                            </div>
                        </ModalBody>
                        {/*<ModalFooter className={'stylish-color-dark'}>*/}
                        {/*<Button color="secondary" onClick={this.toggle}>Close</Button>{' '}*/}
                        {/*<Button color="primary" onClick={this.saveUser}>Add user</Button>*/}
                        {/*</ModalFooter>*/}
                    </Modal>
                </Container>
            </div>
        );
    }

}
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

export default class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newUserRole: 'ROLE_ADMIN',
            newUserEmail: '',
            newUserUsername: '',
            newUserBirthDate: '',
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

    componentDidMount() {
        let user = this.props.user;
        if (user) {
            this.setState({
                newUserRole: user.role,
                newUserEmail: user.email,
                newUserUsername: user.username,
                // newUserBirthDate: user.birth_day,
                newUserFirstName: user.name,
                newUserSecondName: user.surname,
                newUserPassport: user.passport === null ? '' : user.passport
            });
        }
    }

    validateUser = () => {
        let emailVal = ValidationUtil.validateEmailForPattern(this.state.newUserEmail);
        let userNameVal = ValidationUtil.validateStringForLength(this.state.newUserUsername, 5, 20);
        let dateVal = true;//ValidationUtil.validateDateForNotThisYear(this.state.newUserBirthDate);
        let nameVal = ValidationUtil.validateStringForLength(this.state.newUserFirstName, 2, 40);
        let surnameVal = ValidationUtil.validateStringForLength(this.state.newUserSecondName, 4, 40);
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
        return emailVal && userNameVal && dateVal && nameVal && surnameVal;
    };

    saveUser = () => {
        let ref = this;
        if (this.validateUser()) {
            let formData = new FormData();
            formData.append('email', this.state.newUserEmail);
            formData.append('username', this.state.newUserUsername);
            formData.append('role', this.state.newUserRole);
            formData.append('birth_day', this.state.newUserBirthDate);
            formData.append('name', this.state.newUserFirstName);
            formData.append('surname', this.state.newUserSecondName);
            formData.append('passport', this.state.newUserPassport);
            formData.append('id', this.props.user.id);
            fetch(`/api/ownerAndAdmin/editUser`, {
                body: formData,
                method: 'post',
                headers: {authorization: localStorage.getItem('authorization')}
            }).then(response => {
                return response.json();
            }).then(data => {
                if (data.error === undefined) {
                    this.toggle();
                    ref.props.renderUsers();
                    NotificationManager.success(data.status);
                } else {
                    NotificationManager.error(data.error);
                }
            })
        } else {
            NotificationManager.warning("check your data");
        }
    };

    render() {
        return (
            <div className={'animated fadeIn'}>
                <Container>
                    <MDBIcon icon="edit" onClick={this.toggle}/>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Edit user: {this.props.user.username}</ModalHeader>
                        <ModalBody>
                            <form>
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol md="">
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                                        <h3 className="my-3">
                                                            <MDBIcon icon="lock"/> Edit user
                                                        </h3>
                                                    </MDBCardHeader>
                                                    <MDBInput
                                                        label="Email"
                                                        onChange={this.changeInput}
                                                        id={'newUserEmail'}
                                                        value={this.state.newUserEmail}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-email-span"/>
                                                    <MDBInput
                                                        label="Username"
                                                        onChange={this.changeInput}
                                                        value={this.state.newUserUsername}
                                                        id={'newUserUsername'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-username-span"/>
                                                    <MDBInput
                                                        label="First name"
                                                        onChange={this.changeInput}
                                                        value={this.state.newUserFirstName}
                                                        id={'newUserFirstName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-name-span"/>
                                                    <MDBInput
                                                        label="Second name"
                                                        onChange={this.changeInput}
                                                        value={this.state.newUserSecondName}
                                                        id={'newUserSecondName'}
                                                        group
                                                        type="text"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-surname-span"/>
                                                    <MDBInput
                                                        // label="Birth date"
                                                        onChange={this.changeInput}
                                                        id={'newUserBirthDate'}
                                                        value={this.state.newUserBirthDate}
                                                        group
                                                        type="date"
                                                        validate
                                                        error="wrong"
                                                        success="right"
                                                    />
                                                    <span className="error-span" id="error-date-span"/>
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
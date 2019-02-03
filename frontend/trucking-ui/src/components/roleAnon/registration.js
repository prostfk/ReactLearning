import React, {Component} from 'react';
import {
    Animation,
    MDBContainer,
    MDBRow,
    MDBInput,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBCardHeader,
    MDBBtn
} from "mdbreact";
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {DatePicker} from 'material-ui-pickers';
import {Input} from 'reactstrap';
// import {DatePicker as MaterialDatePicker } from 'material-ui-pickers';
import CommonUtil from "../../lib/commontUtil";
import DateFnsUtils from "@date-io/date-fns";
import {NotificationManager} from 'react-notifications';


export default class Registration extends Component {

    state = {
        email: '',
        password: '',
        passwordAgain: '',
        username: '',
        firstName: '',
        secondName: '',
        birthDay: new Date(),
        companyName: ''
    };

    changeInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    changeDate = (id, date) => {
        this.setState({
            [id]: date
        });
    };

    validate = () => {
        // let email = CommonUtil.getStringFromUnknownObject(this.state.email);
        let pass = CommonUtil.getStringFromUnknownObject(this.state.password);
        let passAgain = CommonUtil.getStringFromUnknownObject(this.state.passwordAgain);
        if (pass !== passAgain) {
            document.getElementById('pass-span').innerText = 'Passwords do not match';
            return false;
        } else {
            document.getElementById('pass-span').innerText = '';
            return true;
        }
    };

    addUser = () => {
        if (this.validate) {
            let formData = new FormData();
            formData.append('username', CommonUtil.getStringFromUnknownObject(this.state.username));
            formData.append('firstName', CommonUtil.getStringFromUnknownObject(this.state.firstName));
            formData.append('secondName', CommonUtil.getStringFromUnknownObject(this.state.secondName));
            formData.append('birthDate', CommonUtil.dateToDataBaseString(this.state.birthDay));
            formData.append('password', CommonUtil.getStringFromUnknownObject(this.state.password));
            formData.append('companyName', CommonUtil.getStringFromUnknownObject(this.state.companyName));
            formData.append('email', this.state.email);
            fetch('/api/registration', {method: 'post', body: formData}).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.error === undefined) {
                    NotificationManager.success("Success");
                    this.props.history.push("/");
                }
            })
        }


    };

    render() {
        return <>
            <div className="container">
                <div className="offset-md-3 col-md-6">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="">
                                <MDBCard>
                                    <MDBCardBody className={'grey darken-3'} style={{color:'white'}}>
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
                                            style={{color: 'white'}}
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
                                            style={{color: 'white'}}
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
                                            style={{color: 'white'}}
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
                                            style={{color: 'white'}}
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
                                            style={{color: 'white'}}
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker id={'birthDay'} value={this.state.birthDay}
                                                        style={{width: '100%', color: 'white'}}
                                                        onChange={(e) => this.changeDate('birthDay', e)}/>
                                        </MuiPickersUtilsProvider>
                                        <MDBInput
                                            label="Password"
                                            onChange={this.changeInput}
                                            id={'password'}
                                            group
                                            style={{color: 'white'}}
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
                                            style={{color: 'white'}}
                                            type="password"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <Animation type="fadeIn" infinite>
                                            <span id={'pass-span'} className="error-span"/>
                                        </Animation>
                                        <div className="text-center mt-4">
                                            <MDBBtn color="deep-orange" className="mb-3" type="submit"
                                                    onClick={this.addUser}>
                                                Registration
                                            </MDBBtn>
                                        </div>

                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </div>

        </>
    }

}
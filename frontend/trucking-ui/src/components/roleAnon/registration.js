import React, {Component} from 'react';
import {
    MDBAnimation,
    MDBContainer,
    MDBRow,
    MDBInput,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBModalFooter,
    MDBIcon,
    MDBCardHeader,
    MDBBtn
} from "mdbreact";
import CommonUtil from "../../lib/commontUtil";


export default class Registration extends Component {

    state = {
        email: '',
        password: '',
        passwordAgain: ''
    };

    changeInput = (event) => {
        this.setState({
            [event.target.id]: [event.target.value]
        });
    };

    validate = () => {
        let email = CommonUtil.getStringFromUnknownObject(this.state.email);
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
            formData.append('email', CommonUtil.getStringFromUnknownObject(this.state.email));
            formData.append('password', CommonUtil.getStringFromUnknownObject(this.state.password));
            fetch('/api/registration', {method: 'post', body: formData}).then(response => {
                return response.json();
            }).then(data => {
                if (data.error === undefined) {
                    history.pushState('/');
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
                                    <MDBCardBody>
                                        <MDBCardHeader className="form-header warm-flame-gradient rounded">
                                            <h3 className="my-3">
                                                <MDBIcon icon="lock"/> Registration
                                            </h3>
                                        </MDBCardHeader>
                                        <MDBInput
                                            label="Email"
                                            onChange={this.changeInput}
                                            id={'email'}
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <MDBInput
                                            label="Password"
                                            nChange={this.changeInput}
                                            id={'password'}
                                            group
                                            type="password"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <MDBInput
                                            label="Submit password"
                                            nChange={this.changeInput}
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
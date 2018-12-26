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
import CommonUtil from "../../lib/commontUtil";
import {connect} from "react-redux";
import {AUTH_SUCCESS} from "../../constants/userActionType";


class Auth extends Component {

    state = {
        username: '',
        password: '',
        passwordAgain: ''
    };

    changeInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    validate = () => {
        let username = CommonUtil.getStringFromUnknownObject(this.state.email);
        let pass = CommonUtil.getStringFromUnknownObject(this.state.password);
        if (pass.length > 4 && username.length > 4) {
            document.getElementById('pass-span').innerText = 'Check your data';
            return false;
        } else {
            document.getElementById('pass-span').innerText = '';
            return true;
        }
    };

    addUser = () => {
        let ref = this;
        if (this.validate) {
            let formData = new FormData();
            formData.append('username', CommonUtil.getStringFromUnknownObject(this.state.username));
            formData.append('password', CommonUtil.getStringFromUnknownObject(this.state.password));
            fetch('http://localhost:3001/api/auth', {method: 'post', body: formData}).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                if (data.error === undefined) {
                    ref.props.authUser([
                        data.userRole,data.token, data.userId, data.companyId
                    ]);
                    localStorage.setItem('role', data.userRole);
                    localStorage.setItem('authorization', data.token);
                    this.props.history.push('/');
                }else{
                    document.getElementById('pass-span').innerText = data.error;
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
                                                <MDBIcon icon="lock"/> Auth
                                            </h3>
                                        </MDBCardHeader>
                                        <MDBInput
                                            label="Username"
                                            onChange={this.changeInput}
                                            value={this.state.username}
                                            id={'username'}
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <MDBInput
                                            label="Password"
                                            onChange={this.changeInput}
                                            value={this.state.password}
                                            id={'password'}
                                            group
                                            type="password"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <Animation type="fadeIn" count={1}>
                                            <span id={'pass-span'} className="error-span"/>
                                        </Animation>
                                        <div className="text-center mt-4">
                                            <MDBBtn color="deep-orange" className="mb-3" type="submit"
                                                    onClick={this.addUser}>
                                                Auth
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


const mapStateToProps = state => {
    return {
        userState: state.userReducer
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        authUser: payload => {
            dispatch({type: AUTH_SUCCESS,payload: payload})
        }
    })
};
export default connect(mapStateToProps,mapDispatchToProps)(Auth);

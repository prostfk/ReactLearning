import React, {Component} from 'react';
import { MDBBtn } from "mdbreact";

export default class LogoutButton extends Component {


    logoutProcess = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    render(){

        return <MDBBtn onClick={this.logoutProcess}>Logout</MDBBtn>

    }

}

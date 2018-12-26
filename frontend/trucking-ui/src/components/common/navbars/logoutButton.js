import React, {Component} from 'react';
import { MDBBtn } from "mdbreact";

export default class LogoutButton extends Component {


    logoutProcess = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    render(){
        let role = localStorage.getItem('role');
        return <MDBBtn onClick={this.logoutProcess}>Logout({role.split('_')[1]})</MDBBtn>

    }

}

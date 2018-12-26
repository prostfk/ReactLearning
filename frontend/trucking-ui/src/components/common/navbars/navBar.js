import React, {Component} from 'react';
import OwnerNavBar from "./ownerNavBar";
import AnonNavBar from "./anonNavBar";
import {NotificationContainer} from "react-notifications";

export default class NavBar extends Component {

    getNav = () => {
        switch (localStorage.getItem('role')) {
            case 'ROLE_OWNER': return <OwnerNavBar/>;
            default: return <AnonNavBar/>
        }
    };

    render(){
        return <div>
        {this.getNav()}
    </div>
    }

}
import React, {Component} from 'react';
import OwnerNavBar from "../../roleOwner/ownerNavBar";
import AnonNavBar from "./anonNavBar";
import AdminNavBar from "../../roleAdmin/adminNavBar";
import DispatcherNavBar from "../../roleDispatcher/dispatcherNavBar";

export default class NavBar extends Component {

    getNav = () => {
        switch (localStorage.getItem('role')) {
            case 'ROLE_OWNER': return <OwnerNavBar/>;
            case 'ROLE_ADMIN': return <AdminNavBar/>;
            case 'ROLE_DISPATCHER': return <DispatcherNavBar/>;
            default: return <AnonNavBar/>
        }
    };

    render(){
        return <div>
        {this.getNav()}
    </div>
    }

}
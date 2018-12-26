import React, {Component} from 'react';
import OwnerNavBar from "./ownerNavBar";
import AnonNavBar from "./anonNavBar";
import AdminNavBar from "./adminNavBar";

export default class NavBar extends Component {

    getNav = () => {
        switch (localStorage.getItem('role')) {
            case 'ROLE_OWNER': return <OwnerNavBar/>;
            case 'ROLE_ADMIN': return <AdminNavBar/>;
            default: return <AnonNavBar/>
        }
    };

    render(){
        return <div>
        {this.getNav()}
    </div>
    }

}
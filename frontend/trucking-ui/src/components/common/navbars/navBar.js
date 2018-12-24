import React, {Component} from 'react';
import OwnerNavBar from "./ownerNavBar";
import AnonNavBar from "./anonNavBar";

export default class NavBar extends Component {

    getNav = () => {
        switch (localStorage.getItem('role')) {
            case 'ROLE_OWNER': return <OwnerNavBar/>;
            default: return <AnonNavBar/>
        }
    };

    render(){return <div style={{width: '100%'}}>
        {this.getNav()}
    </div>
    }

}
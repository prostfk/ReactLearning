import React, {Component} from 'react';
import OwnerNavBar from "../../roleOwner/ownerNavBar";
import AnonNavBar from "../../roleAnon/anonNavBar";
import AdminNavBar from "../../roleAdmin/adminNavBar";
import DispatcherNavBar from "../../roleDispatcher/dispatcherNavBar";
import DriverNavBar from "../../roleDriver/driverNavBar";
import ManagerNavBar from "../../roleManager/managerNavBar";
import SysAdminNavBar from "../../roleSysAdmin/sysAdminNavBar";
import { ROLE_OWNER, ROLE_ADMIN, ROLE_DISPATCHER, ROLE_DRIVER, ROLE_MANAGER, ROLE_SYS_ADMIN } from '../../../constants/roles/userRoles';

export default class NavBar extends Component {

    getNav = () => {
        switch (localStorage.getItem('role')) {
            case ROLE_OWNER: return <OwnerNavBar/>;
            case ROLE_ADMIN: return <AdminNavBar/>;
            case ROLE_DISPATCHER: return <DispatcherNavBar/>;
            case ROLE_DRIVER: return <DriverNavBar/>;
            case ROLE_MANAGER: return <ManagerNavBar/>;
            case ROLE_SYS_ADMIN: return <SysAdminNavBar/>;
            default: return <AnonNavBar/>
        }
    };

    render(){
        return <div>
        {this.getNav()}
    </div>
    }

}
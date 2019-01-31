import React, {Component} from 'react';
import OwnerIndexPage from "../../roleOwner/ownerIndexPage";
import DispatcherIndexPage from "../../roleDispatcher/dispatcherIndexPage";
import DriverIndexPage from "../../roleDriver/driverIndexPage";
import ManagerIndexPage from "../../roleManager/managerIndexPage";
import SysAdminIndexPage from "../../roleSysAdmin/sysAdminIndexPage";


export default class IndexPage extends Component {

    renderIndex = () => {
        switch (localStorage.getItem('role')) {
            case 'ROLE_OWNER':
                return <OwnerIndexPage/>;
            case 'ROLE_ADMIN':
                return <OwnerIndexPage/>;
            case 'ROLE_DISPATCHER':
                return <DispatcherIndexPage/>;
            case 'ROLE_DRIVER':
                return <DriverIndexPage/>;
            case 'ROLE_MANAGER':
                return <ManagerIndexPage/>;
            case 'ROLE_SYS_ADMIN':
                return <SysAdminIndexPage/>;
            default:
                return <div/>;
        }
    };

    render() {
        return this.renderIndex();
    }

}
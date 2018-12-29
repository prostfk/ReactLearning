import React, {Component} from 'react';
import OwnerIndexPage from "../../roleOwner/ownerIndexPage";
import DispatcherIndexPage from "../../roleDispatcher/dispatcherIndexPage";

export default class IndexPage extends Component {

    renderIndex = () => {
        switch (localStorage.getItem('role')) {
            case 'ROLE_OWNER':
                return <OwnerIndexPage/>;
            case 'ROLE_ADMIN':
                return <OwnerIndexPage/>;
            case 'ROLE_DISPATCHER':
                return <DispatcherIndexPage/>;
            default:
                return <div/>;
        }
    };

    render() {
        return this.renderIndex();
    }

}
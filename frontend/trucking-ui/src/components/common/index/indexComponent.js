import React, {Component} from 'react';
import OwnerIndexPage from "./ownerIndexPage";

export default class IndexPage extends Component {

    renderIndex = () => {
        switch (localStorage.getItem('role')) {
            case 'ROLE_OWNER':
                return <OwnerIndexPage/>;
            default:
                return <div/>;
        }
    };

    render() {
        {return this.renderIndex()}
    }

}
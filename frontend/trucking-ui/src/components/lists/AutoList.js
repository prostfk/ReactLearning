import React, {Component} from 'react';
import {Table} from 'reactstrap';
import EditUser from "../common/adminAndOwner/editUser";
import {ROLE_ADMIN, ROLE_OWNER} from "../../constants/roles/userRoles";
import EditAuto from "../roleAdmin/modal/editAuto";

export default class AutoList extends Component {

    render() {
        return (
            this.props.autos ? (
                this.props.autos.length > 0 ?
                    <Table dark style={{backgroundColor: '#3F4752'}}>
                        <thead className={'animated fadeIn'}>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Auto number</th>
                            <th>Type</th>
                            <th>Fuel</th>
                            {
                                this.__renderSideLabel()
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.autos.map((auto, index) => {
                                return <tr key={index} className={'animated fadeInUp'}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{auto.name}</td>
                                    <td>{auto.carNumber}</td>
                                    <td>{auto.type}</td>
                                    <td>{auto.fuelConsumption}</td>
                                    {
                                        this.__renderSideButton(auto)
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </Table> : <h1 className={'animated fadeInUp'}>No autos yet</h1>
            ) : <div/>
        );
    }


    __renderSideLabel() {
        switch (this.props.role) {
            case ROLE_ADMIN:
                return <th>Edit</th>;
            default:
                return <></>;
        }
    }

    __renderSideButton = (auto) => {
        switch (this.props.role) {
            case ROLE_ADMIN:
                return <td><EditAuto auto={auto} renderAutos={this.updateUsers}/></td>;
            default:
                return <></>;
        }
    }

}
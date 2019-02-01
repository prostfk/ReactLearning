import React, {Component} from 'react';
import {Table} from 'reactstrap';
import EditUser from "../common/adminAndOwner/editUser";
import {ROLE_ADMIN, ROLE_OWNER} from "../../constants/roles/userRoles";

export default class UsersList extends Component {

    render() {
        return (
            this.props.users ? (
                this.props.users.length > 0 ?
                    <Table dark style={{backgroundColor: '#3F4752'}}>
                        <thead className={'animated fadeIn'}>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Role</th>
                            {
                                this.__renderSideLabel()
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.users.map((user, index) => {
                                return <tr key={index} className={'animated fadeInUp'}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{this.__processRole(user.role)}</td>
                                    {
                                        this.__renderSideButton(user)
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </Table> : <h1 className={'animated fadeInUp'}>No users yet</h1>
            ) : <div/>
        );
    }

    __processRole = (role) => {
        let array = role.split('_');
        return array[1].toLowerCase();
    };

    __renderSideLabel() {
        switch (localStorage.getItem("role")) {
            case ROLE_ADMIN || ROLE_OWNER:
                return <th>Edit</th>;
            default:
                return <></>;
        }
    }

    __renderSideButton = (user) => {
        switch (localStorage.getItem("role")) {
            case ROLE_ADMIN || ROLE_OWNER:
                if (user.role !== ROLE_OWNER) {
                    return <td><EditUser user={user} renderUsers={this.updateUsers}/></td>;
                } else {
                    return <></>
                }
            default:
                return <></>;
        }
    }

}
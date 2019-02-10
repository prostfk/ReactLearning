import React, {Component} from 'react';
import {Table} from 'reactstrap';
import EditUser from "../common/adminAndOwner/editUser";
import {ROLE_ADMIN, ROLE_OWNER} from "../../constants/roles/userRoles";
import Pagination from "react-js-pagination";

export default class UsersList extends Component {

    render() {
        return (
            this.props.users ? (
                this.props.users.length > 0 ?
                   <div>
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
                                    <th scope="row">{((this.props.activePage-1) * 5) + index + 1}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.secondName}</td>
                                    <td>{this.__processRole(user.userRole)}</td>
                                    {
                                        this.__renderSideButton(user)
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                        </Table>
                        <div>
                            {
                                this.props.totalSize && this.props.activePage ? 
                                    <Pagination
                                    activePage={this.props.activePage}
                                    totalItemsCount={this.props.totalSize}
                                    itemsCountPerPage={5}
                                    pageRangeDisplayed={5}
                                    hideDisabled={true}
                                    itemClass={"page-item white-back-grey-font"}
                                    linkClass={"page-link white-font"}
                                    activeClass={"activePage"}
                                    style={{border: '1px solid grey', backgroundColor: 'grey'}}
                                    onChange={this.props.onPageChanged}
                                    /> : <div/>  
                            }  
                        </div>
                   </div>
                     : <h1 className={'animated fadeInUp'}>No users yet</h1>
            ) : <div/>
        );
    }

    __processRole = (role) => {
        let array = role.split('_');
        return array[1].toLowerCase();
    };

    __renderSideLabel() {
        switch (this.props.role) {
            case ROLE_ADMIN || ROLE_OWNER:
                return <th>Edit</th>;
            default:
                return <></>;
        }
    }

    __renderSideButton = (user) => {
        switch (this.props.role) {
            case ROLE_ADMIN || ROLE_OWNER:
                if (user.role !== ROLE_OWNER) {
                    return <td><EditUser user={user} renderUsers={this.props.updateFunc}/></td>;
                } else {
                    return <></>
                }
            default:
                return <></>;
        }
    }

}
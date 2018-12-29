import React, {Component} from 'react';
import CreateUser from "../common/adminAndOwner/createUser";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import EditUser from "../common/adminAndOwner/editUser";


export default class OwnerIndexPage extends Component {


    state = {
        users: [],
        selectedUser: {},
        toggle: false
    };

    componentDidMount(){
        this.updateUsers();
    }

    updateUsers = () => {
        fetch('/api/ownerAndAdmin/users',{headers:{'authorization': localStorage.getItem('authorization')}}).then(response=>{
            return response.json();
        }).then(data=>{
            if (data.error===undefined){
                this.setState({
                    users: data
                });
            }else{
                NotificationManager.warn(data.error);
            }
        })
    };

    render() {
        return (
            <div className={'container'}>
                <MDBRow>
                    <MDBCol/>
                    <MDBCol size={'6'}>
                        {this.state.users.length > 0 ? <Table>
                            <TableHead color="grey">
                                <tr className={'animated fadeIn'}>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Role</th>
                                    <th>Edit</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.users.map((user, index) => {
                                        return <tr className={'animated fadeInUp'} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.surname}</td>
                                            <td>{this.__processRole(user.role)}</td>
                                            <td><EditUser user={user} renderUsers={this.updateUsers}/></td>
                                        </tr>
                                    })
                                }
                            </TableBody>
                        </Table> : <h1>No users yet</h1>}
                    </MDBCol>
                    <MDBCol>
                        <CreateUser renderUsers={this.updateUsers}/>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }


    __processRole = (role) => {
        let array = role.split('_');
        return array[1].toLowerCase();
    }


}
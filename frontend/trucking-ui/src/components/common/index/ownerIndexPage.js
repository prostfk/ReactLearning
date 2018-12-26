import React, {Component} from 'react';
import CreateUser from "../adminAndOwner/createUser";
import {MDBRow, MDBCol, Table, TableBody, TableHead, MDBIcon} from 'mdbreact';
import {NotificationManager} from "react-notifications";


export default class OwnerIndexPage extends Component {


    state = {
        users: []
    };

    componentDidMount(){
        this.updateUsers();
    }



    updateUsers = () => {
        fetch('http://localhost:3001/api/owner/users',{headers:{'authorization': localStorage.getItem('authorization')}}).then(response=>{
            return response.json();
        }).then(data=>{
            console.log(data);
            if (data.error===undefined){
                this.setState({
                    users: data
                });
                console.log(this.state)
            }else{
                console.log('error')
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
                                <tr>
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
                                            <td><MDBIcon icon="edit" /></td>
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
import React, {Component} from 'react';
import CreateUser from "../adminAndOwner/createUser";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';


export default class OwnerIndexPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }


    componentDidMount(){
        this.updateUsers();
    }

    updateUsers = () => {
        fetch('http://localhost:3001/api/owner/users',{headers:{'Auth-token': localStorage.getItem('Auth-token')}}).then(response=>{
            return response.json();
        }).then(data=>{
            console.log(data);
            if (data.error!==undefined){
                this.setState({
                    users: data
                });
            }
        })
    };

    render() {
        return (
            <>
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
                                </tr>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.users.map((user, index) => {
                                        return <tr>
                                            <td>{index}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.secondName}</td>
                                            <td>{user.role}</td>
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
            </>
        );
    }


}
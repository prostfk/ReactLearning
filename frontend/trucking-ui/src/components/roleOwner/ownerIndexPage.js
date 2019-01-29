import React, {Component} from 'react';
import CreateUser from "../common/adminAndOwner/createUser";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import EditUser from "../common/adminAndOwner/editUser";
import {LOAD_USERS} from "../../constants/workersActionType";
import connect from "react-redux/es/connect/connect";


export class OwnerIndexPage extends Component {


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
                this.props.loadWorkers(data);
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
                        {this.props.users.length > 0 ? <Table>
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
                                    this.props.users.map((user, index) => {
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
                        </Table> : <h1 className={'animated fadeInUp'}>No users yet</h1>}
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

const mapStateToProps = state => {
    return {
        users: state.workerReducer
    };
};
const mapDispatchToProps = dispatch => {
    return ({
        loadWorkers: payload => {
            dispatch({
                type: LOAD_USERS, payload: payload
            })
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(OwnerIndexPage);
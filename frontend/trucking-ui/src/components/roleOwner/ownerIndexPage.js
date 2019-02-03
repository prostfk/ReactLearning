import React, {Component} from 'react';
import CreateUser from "../common/adminAndOwner/createUser";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import EditUser from "../common/adminAndOwner/editUser";
import {LOAD_USERS} from "../../constants/workersActionType";
import connect from "react-redux/es/connect/connect";
import UsersList from "../lists/UsersList";


export class OwnerIndexPage extends Component {


    state = {
        users: [],
        selectedUser: {},
        toggle: false
    };

    componentDidMount() {
        this.updateUsers();
    }

    updateUsers = () => {
        fetch('/api/owner/users', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error === undefined) {
                this.props.loadWorkers(data);
            } else {
                NotificationManager.warning(data.error);
            }
        }).catch(() => {
            NotificationManager.warning("No connection to server")
        })
    };

    render() {
        return (
            <div>
                <h3 style={{textAlign:'center', color: 'white'}} className={'animated fadeInDown'}>Users</h3>

                <div className={'row margin-container'}>

                    <div className="offset-md-2 col-md-5">
                        <UsersList users={this.props.users}/>
                    </div>
                    <div className="offset-md-2 col-md-2">
                        <CreateUser renderUsers={this.updateUsers}/>
                    </div>
                </div>
            </div>
        );
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
import React, { Component } from 'react';
import CreateUser from "../common/adminAndOwner/createUser";
import { MDBRow, MDBCol, Table, TableBody, TableHead } from 'mdbreact';
import { NotificationManager } from "react-notifications";
import { LOAD_USERS } from "../../constants/workersActionType";
import connect from "react-redux/es/connect/connect";
import UsersList from "../lists/UsersList";
import { ROLE_ADMIN } from "../../constants/roles/userRoles";
import Pagination from "react-js-pagination";


export class AdminIndexPage extends Component {

    constructor(props) {
        super(props);
        document.title = 'Users';
    }


    state = {
        users: [],
        selectedUser: {},
        toggle: false,
        activePage: 1,
        totalSize: 1,
    };

    componentDidMount() {
        this.updateUsers();
    }

    updateUsers = (page = this.state.activePage) => {
        fetch(`/api/users?page=${page}`, { headers: { 'authorization': localStorage.getItem('authorization') } }).then(response => {
            return response.json();
        }).then(data => {
            if (!data.error) {
                this.props.loadWorkers(data.content);
                this.setState({
                    totalSize: data.totalElements,
                });
            } else {
                NotificationManager.warning(data.error);
            }
        }).catch(() => {
            NotificationManager.warning("No connection to server")
        })
    };

    changePage = page => {
        this.setState({activePage: page})
        this.updateUsers(page);
    }

    render() {
        console.log(this.state.totalSize)
        return (
            <div>
                <h3 style={{ textAlign: 'center', color: 'white' }} className={'animated fadeInDown'}>Users</h3>

                <div className={'row margin-container'}>

                    <div className="offset-md-2 col-md-5">
                        <UsersList users={this.props.users} role={ROLE_ADMIN} onPageChanged={this.changePage}
                            activePage={this.state.activePage} totalSize={this.state.totalSize}/>
                    </div>
                    <div className="offset-md-2 col-md-2">
                        <CreateUser renderUsers={this.updateUsers} />
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminIndexPage);
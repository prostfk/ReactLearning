import React, {Component} from 'react';
import CreateUser from "../common/adminAndOwner/createUser";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import EditUser from "../common/adminAndOwner/editUser";
import CreateOrder from "./modal/createOrder";
import { Link } from 'react-router-dom'


export default class DispatcherIndexPage extends Component {


    state = {
        orders: [],
        selectedOrder: {},
    };

    componentDidMount() {
        this.updateOrders();
    }

    updateOrders = () => {
        fetch('/api/dispatcher/orders', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error === undefined) {
                this.setState({
                    orders: data
                });
            } else {
                NotificationManager.warning(data.error);
            }
        })
    };

    render() {
        return (
            <div className={'container'}>
                <MDBRow>
                    <MDBCol/>
                    <MDBCol size={'8'}>
                        {this.state.orders.length > 0 ? <Table>
                            <TableHead color="grey">
                                <tr className={'animated fadeIn'}>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Client</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Edit</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.orders.map((order, index) => {
                                        return <tr className={'animated fadeInUp'} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{order.name}</td>
                                            <td>{order.client}</td>
                                            <td>{order.date_departure}</td>
                                            <td>{order.date_arrival}</td>
                                            <td>edit</td>
                                        </tr>
                                    })
                                }
                            </TableBody>
                        </Table> : <h1 className={'animated fadeInUp'}>No orders yet</h1>}
                    </MDBCol>
                    <MDBCol>
                        <Link to={'/createOrder'} className='btn btn-success'>Create order</Link>
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
import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {LOAD_ORDERS} from "../../constants/orderActionType";


export class ManagerIndexPage extends Component {


    state = {
        orders: [],
        selectedOrder: {},
    };

    componentDidMount() {
        this.updateOrders();
    }

    updateOrders = () => {
        fetch('/api/manager/orders', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (!data.error) {
                this.props.loadOrders(data);
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
                                            <td>{new Date(order.date_departure).toLocaleString("ru").split(',')[0]}</td>
                                            <td>{new Date(order.date_arrival).toLocaleString("ru").split(',')[0]}</td>
                                            <td><Link to={`/setRoute/${order.id}`} style={{height: '10%'}} className={'btn btn-secondary'}>Map</Link></td>
                                        </tr>
                                    })
                                }
                            </TableBody>
                        </Table> : <h1 className={'animated fadeInUp'}>No orders yet</h1>}
                    </MDBCol>
                    <MDBCol>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        loadOrders: payload => {
            dispatch({
                type: LOAD_ORDERS, payload: payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerIndexPage);

import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import { Link } from 'react-router-dom'
import CommonUtil from "../../lib/commontUtil";
import {LOAD_STOCKS} from "../../constants/stockActionType";
import connect from "react-redux/es/connect/connect";
import {LOAD_ORDERS} from "../../constants/orderActionType";


export class DispatcherIndexPage extends Component {


    state = {
        selectedOrder: {},
        orders: []
    };

    componentDidMount() {
        this.updateOrders();
    }

    updateOrders = () => {
        fetch('/api/dispatcher/orders', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (!data.error) {
                this.props.loadOrders(data);
            } else {
                NotificationManager.warning(data.error);
            }
        }).catch(()=>{
            NotificationManager.warning('Server error')
        })
    };

    render() {
        return (
            <div className={'container'}>
                <MDBRow>
                    <MDBCol/>
                    <MDBCol size={'8'}>
                        {this.props.orders.length > 0 ? <Table>
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
                                    this.props.orders.map((order, index) => {
                                        return <tr className={'animated fadeInUp'} key={index}>
                                                <td>{index + 1}</td>
                                                <td>{order.name}</td>
                                                <td>{order.client}</td>
                                                <td>{CommonUtil.getLocalDate(order.date_departure, 'ru')}</td>
                                                <td>{CommonUtil.getLocalDate(order.date_arrival, 'ru')}</td>
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


}

const mapStateToProps = state => {
    return {
        orders: state.stockReducer
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

export default connect(mapStateToProps, mapDispatchToProps)(DispatcherIndexPage);
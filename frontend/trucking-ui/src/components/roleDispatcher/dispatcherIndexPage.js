import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import { Link } from 'react-router-dom'
import CommonUtil from "../../lib/commontUtil";
import {LOAD_STOCKS} from "../../constants/stockActionType";
import connect from "react-redux/es/connect/connect";
import {LOAD_ORDERS} from "../../constants/orderActionType";
import {OrdersList} from "../lists/OrdersList";
import {ROLE_DISPATCHER} from "../../constants/roles/userRoles";


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
            <OrdersList orders={this.props.orders} role={ROLE_DISPATCHER}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DispatcherIndexPage);
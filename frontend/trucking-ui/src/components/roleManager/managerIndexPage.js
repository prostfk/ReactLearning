import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {LOAD_ORDERS} from "../../constants/orderActionType";
import {OrdersList} from "../lists/OrdersList";


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
                <h3 style={{textAlign:'center', color: 'white'}} className={'animated fadeInDown'}>Orders</h3>
                <OrdersList orders={this.props.orders}/>
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

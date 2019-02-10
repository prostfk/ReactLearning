import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import {LOAD_ORDERS} from "../../constants/orderActionType";
import connect from "react-redux/es/connect/connect";
import {OrdersList} from "../lists/OrdersList";
import {ROLE_DRIVER} from "../../constants/roles/userRoles";


export class DriverIndexPage extends Component {

    constructor(props) {
        super(props);
        document.title = 'Orders';
    }


    state = {
        orders: [],
        selectedOrder: {},
    };

    componentDidMount() {
        this.updateOrders();
    }

    updateOrders = () => {
        fetch('/api/orders/getMyOrders', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (!data.error) {
                console.log(data)
                this.props.setOrders(data);
            } else {
                NotificationManager.warning(data.error);
            }
        }).catch(err=>NotificationManager.error(err.toString()))
    };

    render() {
        return (
            <div>
                <h3 style={{textAlign: 'center', color: 'white'}}
                    className={'animated fadeInDown'}>Orders</h3>
                <div className={'container'}>
                    <OrdersList orders={this.props.orders} role={ROLE_DRIVER}/>
                </div>
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
        setOrders: payload => {
            dispatch({
                type: LOAD_ORDERS, payload: payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverIndexPage);

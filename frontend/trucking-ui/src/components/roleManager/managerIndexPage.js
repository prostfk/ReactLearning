import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {LOAD_ORDERS} from "../../constants/orderActionType";
import {OrdersList} from "../lists/OrdersList";
import {ROLE_MANAGER} from "../../constants/roles/userRoles";


export class ManagerIndexPage extends Component {


    constructor(props) {
        super(props);
        document.title = 'Orders';
    }


    state = {
        orders: [],
        selectedOrder: {},
        activePage: 1,
        totalSize: 1
    };

    componentDidMount() {
        this.updateOrders();
    }

    changePage = page => {
        this.setState({activePage: page})
        this.updateUsers(page);
    }

    updateOrders = (page = this.state.activePage) => {
        fetch(`/api/manager/orders?page=${page}`, {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (!data.error) {
                this.props.loadOrders(data.content);
                this.setState({
                    totalSize: data.totalElements,
                });
            } else {
                NotificationManager.warning(data.error);
            }
        })
    };

    render() {
        return (
            <div className={'container'}>
                <h3 style={{textAlign:'center', color: 'white'}} className={'animated fadeInDown'}>Orders</h3>
                <OrdersList orders={this.props.orders} role={ROLE_MANAGER} onPageChanged={this.changePage}
                            activePage={this.state.activePage} totalSize={this.state.totalSize}/>
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

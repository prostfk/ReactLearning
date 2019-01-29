import React, {Component} from 'react';
import {connect} from "react-redux";
import {SET_ORDERS} from "../../constants/orderActionType";
import {NotificationManager} from "react-notifications";
import {OrdersList} from "../lists/OrdersList";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {ROLE_OWNER} from "../../constants/roles/userRoles";

export class OwnerOrders extends Component {

    componentDidMount() {
        this.updateFunc();
    }

    updateFunc = () => {
        fetch('/api/owner/orders', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    this.props.setOrders(data);
                } else {
                    NotificationManager.warning(data.error);
                }
            })
    };


    render() {
        return (
            <div className={'container'}>
                <OrdersList style={{width: '100%'}} role={ROLE_OWNER} orders={this.props.orders}/>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer
    }
};

const mapDispatchToProps = dispatch => {
    return ({
        setOrders: payload => {
            dispatch({type: SET_ORDERS, payload: payload})
        }
    })
};
export default connect(mapStateToProps, mapDispatchToProps)(OwnerOrders);

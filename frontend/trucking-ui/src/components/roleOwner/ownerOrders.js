import React, {Component} from 'react';
import {connect} from "react-redux";
import {SET_ORDERS} from "../../constants/orderActionType";
import {NotificationManager} from "react-notifications";
import {OrdersList} from "../lists/OrdersList";
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {ROLE_OWNER} from "../../constants/roles/userRoles";

export class OwnerOrders extends Component {

    constructor(props) {
        super(props);
        document.title = 'Orders';
    }

    state = {
        activePage: 1,
        totalSize: 1
    }

    changePage = page => {
        this.setState({activePage: page})
        this.updateOrders(page);
    }

    componentDidMount() {
        this.updateOrders();
    }

    updateOrders = (page = this.state.activePage) => {
        fetch(`/api/orders?page=${page}`, {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => response.json())
            .then(data => {
                if (!data.error) {
                    this.props.setOrders(data.content);
                    this.setState({
                        totalSize: data.totalElements,
                    });
                } else {
                    NotificationManager.warning(data.error);
                }
            }).catch(()=>{
                NotificationManager.warning("Connection error");
        })
    };


    render() {
        return (
            <div>
                <h3 style={{textAlign:'center', color: 'white'}} className={'animated fadeInDown'}>Orders</h3>
                <div className={'container'}>
                    <OrdersList style={{width: '100%'}} role={ROLE_OWNER} orders={this.props.orders} onPageChanged={this.changePage}
                            activePage={this.state.activePage} totalSize={this.state.totalSize}/>
                </div>
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

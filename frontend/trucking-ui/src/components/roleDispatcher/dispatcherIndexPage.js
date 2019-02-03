import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead, Button} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import {Link} from 'react-router-dom'
import CommonUtil from "../../lib/commontUtil";
import {LOAD_STOCKS} from "../../constants/stockActionType";
import connect from "react-redux/es/connect/connect";
import {LOAD_ORDERS} from "../../constants/orderActionType";
import {OrdersList} from "../lists/OrdersList";
import {ROLE_DISPATCHER} from "../../constants/roles/userRoles";
import CreateOrder from "./modal/createOrder";


export class DispatcherIndexPage extends Component {

    constructor(props) {
        super(props);
        document.title = 'Orders';
    }


    state = {
        selectedOrder: {},
        orders: [],
        creation: false,
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
        }).catch(() => {
            NotificationManager.warning('Server error')
        })
    };

    switchMode = () => {
        this.setState({
            creation: !this.state.creation
        })
    };

    render() {
        return (
            <div>
                {
                    this.state.creation ? <></> : <h3 style={{textAlign:'center', color: 'white'}} className={'animated fadeInDown'}>Orders</h3>
                }
                <div className="row margin-container">
                    {
                        this.state.creation ?
                            <div className={'container'} style={{color: 'white'}}><CreateOrder cancelFunc={this.switchMode}/></div> :
                            <>

                                <div className="offset-md-2 col-md-5">
                                    <OrdersList orders={this.props.orders} role={ROLE_DISPATCHER}/>
                                </div>
                                <div className="offset-md-2 col-md-2">
                                    <Button color={'success'}
                                            onClick={this.switchMode}>Create order</Button>
                                </div>
                            </>
                    }

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
        loadOrders: payload => {
            dispatch({
                type: LOAD_ORDERS, payload: payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(DispatcherIndexPage);
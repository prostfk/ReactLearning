import React, {Component} from 'react';
import CommonUtil from "../../lib/commontUtil";
import {Link} from "react-router-dom";
import {ROLE_DISPATCHER, ROLE_MANAGER} from "../../constants/roles/userRoles";
import {Table} from 'reactstrap';

export class OrdersList extends Component {

    render() {
        return (
            this.props.orders.length > 0 ? <Table dark style={{backgroundColor: '#3F4752'}}>
                <thead color="grey">
                    <tr className={'animated fadeIn'}>
                        <th>id</th>
                        <th>Name</th>
                        <th>Client</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        {
                            this.__renderFunctionalLabel()
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.orders.map((order, index) => {
                            return <tr className={'animated fadeInUp'} key={index}>
                                <td>{index + 1}</td>
                                <td>{order.name}</td>
                                <td>{order.client}</td>
                                <td>{CommonUtil.getLocalDate(order.date_departure, 'ru')}</td>
                                <td>{CommonUtil.getLocalDate(order.date_arrival, 'ru')}</td>
                                <td>{this.__renderFunctionalButton(order.id)}</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table> : <h1 className={'animated fadeInUp'}>No orders yet</h1>
        )
            ;
    }

    __renderFunctionalLabel = () => {
        let jsx = ``;
        switch (this.props.role) {
            case ROLE_DISPATCHER:
                jsx = <th>Edit</th>;
                break;
            default:
                break;
        }
        return jsx;
    };

    __renderFunctionalButton = (orderId) => {
        let jsx = ``;
        switch (this.props.role) {
            case ROLE_DISPATCHER:
                jsx = <Link to={`/editOrder/${orderId}`} className='btn-sm btn-warning'>Edit</Link>;
                break;
            default:
                break;
        }
        return jsx;
    };

    __renderSideButton = () => {
        let jsx = ``;
        switch (this.props.role) {
            case ROLE_DISPATCHER:
                jsx = <Link to={'/createOrder'} className='btn btn-success'>Create order</Link>;
                break;
            default:
                break;
        }
        return jsx;
    }

}
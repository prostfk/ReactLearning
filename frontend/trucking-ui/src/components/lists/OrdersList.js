import React, { Component } from 'react';
import CommonUtil from "../../lib/commontUtil";
import { Link } from "react-router-dom";
import { ROLE_DISPATCHER, ROLE_DRIVER, ROLE_MANAGER } from "../../constants/roles/userRoles";
import { Table } from 'reactstrap';
import Pagination from "react-js-pagination";

export class OrdersList extends Component {

    render() {
        return (
            this.props.orders.length > 0 ?
                <div>
                    <Table dark style={{ backgroundColor: '#3F4752' }}>
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
                                        <td>{((this.props.activePage-1) * 5) + index + 1}</td>
                                        <td>{order.name}</td>
                                        <td>{order.client.name}</td>
                                        <td>{order.dateAccepted.join('-')}</td>
                                        <td>{order.dateExecuted.join('-')}</td>
                                        <td>{this.__renderFunctionalButton(order.id)}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                    <div>
                        {
                            this.props.totalSize && this.props.activePage ?
                                <Pagination
                                    activePage={this.props.activePage}
                                    totalItemsCount={this.props.totalSize}
                                    itemsCountPerPage={5}
                                    pageRangeDisplayed={5}
                                    hideDisabled={true}
                                    itemClass={"page-item white-back-grey-font"}
                                    linkClass={"page-link white-font"}
                                    activeClass={"activePage"}
                                    style={{ border: '1px solid grey', backgroundColor: 'grey' }}
                                    onChange={this.props.onPageChanged}
                                /> : <div />
                        }
                    </div>
                </div>
                : <h1 className={'animated fadeInUp'}>No orders yet</h1>
        )
            ;
    }

    __renderFunctionalLabel = () => {
        let jsx = ``;
        switch (this.props.role) {
            case ROLE_DISPATCHER:
                jsx = <th>Edit</th>;
                break;
            case ROLE_MANAGER || ROLE_DRIVER:
                jsx = <th>Route</th>;
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
            case ROLE_MANAGER:
                jsx = <Link to={`/setRoute/${orderId}`} className='btn-sm btn-warning'>Route</Link>;
                break;
            default:
            case ROLE_DRIVER:
                jsx = <Link to={`/route/${orderId}`} className='btn-sm btn-info'>Route</Link>;
                break;
        }
        return jsx;
    };

}
import React, {Component} from 'react';
import {ROLE_ADMIN, ROLE_DISPATCHER} from "../../constants/roles/userRoles";
import {Link} from "react-router-dom";
import {Table} from 'reactstrap';

export default class StocksList extends Component {

    render() {
        return (
            <Table>

                {this.props.stocks.length > 0 ? <Table dark style={{backgroundColor: '#3F4752'}}>
                    <thead color="grey">
                    <tr className={'animated fadeIn'}>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        {
                            this.__renderFunctionalLabel()
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.stocks.map((stock, index) => {
                            return <tr className={'animated fadeInUp'} key={index}>
                                <td>{index + 1}</td>
                                <td>{stock.name}</td>
                                <td>{stock.address}</td>
                                {
                                    this.__renderFunctionalButton()
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </Table> : <h1 className={'animated fadeInUp'}>No orders yet</h1>}
                {
                    this.__renderSideButton()
                }
            </Table>
        );
    }

    __renderFunctionalLabel = () => {
        let jsx = ``;
        switch (this.props.role) {
            case ROLE_ADMIN:
                jsx = <th>Edit</th>;
                break;
            default:
                break;
        }
        return jsx;
    };

    __renderFunctionalButton = (stockId) => {
        let jsx = ``;
        switch (this.props.role) {
            case ROLE_ADMIN:
                jsx = <Link to={`/editStock/${stockId}`} className='btn-sm btn-warning'>Edit</Link>;
                break;
            default:
                break;
        }
        return jsx;
    };

    __renderSideButton = () => {
        let jsx = ``;
        switch (this.props.role) {
            case ROLE_ADMIN:
                jsx = <Link to={'/сreateStock'} className='btn btn-success'>Create stock</Link>;
                break;
            default:
                break;
        }
        return jsx;
    }

}
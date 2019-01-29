import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {LOAD_STOCKS} from "../../constants/stockActionType";


export class DispatcherStocks extends Component {

    componentDidMount() {
        this.updateStocks();
    }

    updateStocks = () => {
        fetch('/api/dispatcher/stocks', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error === undefined) {
                this.props.loadStocks(data);
            } else {
                NotificationManager.warning(data.error);
            }
        }).catch(()=>{
            NotificationManager.warning('Server error')
        })
    };

    render() {
        return (
            <div className={'container'}>
                <MDBRow>
                    <MDBCol/>
                    <MDBCol size={'8'}>
                        {this.props.stocks.length > 0 ? <Table>
                            <TableHead color="grey">
                                <tr className={'animated fadeIn'}>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Edit</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.stocks.map((stock, index) => {
                                        return <tr className={'animated fadeInUp'} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{stock.name}</td>
                                            <td>{stock.address}</td>
                                            <td>edit</td>
                                        </tr>
                                    })
                                }
                            </TableBody>
                        </Table> : <h1 className={'animated fadeInUp'}>No orders yet</h1>}
                    </MDBCol>
                    <MDBCol>
                        {/*<Link to={'/createStock'} className='btn btn-success'>Add stock</Link>*/}
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        stocks: state.stockReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        loadStocks: payload => {
            dispatch({
                type: LOAD_STOCKS, payload: payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(DispatcherStocks);
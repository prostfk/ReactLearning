import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import {Link} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {LOAD_STOCKS} from "../../constants/stockActionType";
import StocksList from "../lists/StocksList";
import {ROLE_ADMIN, ROLE_DISPATCHER} from "../../constants/roles/userRoles";
import CommonUtil from "../../lib/commontUtil";


export class StocksPage extends Component {

    constructor(props) {
        super(props);
        document.title = 'Stocks';
    }


    componentDidMount() {
        this.updateStocks();
    }

    updateStocks = () => {
        let item = localStorage.getItem('role');
        let role = item.split('_')[1].toLowerCase();
        fetch(`/api/${role}/stocks`, {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error === undefined) {
                this.props.loadStocks(data);
            } else {
                NotificationManager.warning(data.error);
            }
        }).catch(() => {
            NotificationManager.warning('Server error')
        })
    };

    render() {
        return (
            <div>
                {
                    CommonUtil.getCurrentUserRole() === ROLE_ADMIN ?
                        <div>
                            <h3 style={{textAlign: 'center', color: 'white'}}
                                className={'animated fadeInDown'}>Stocks</h3>

                            <div className={'row margin-container'}>
                                <div className='offset-md-2 col-md-5'>
                                    <StocksList stocks={this.props.stocks} role={localStorage.getItem('role')}/>
                                </div>
                                <div className='offset-md-2 col-md-2'>
                                    <Link to={'/createStock'} className='btn btn-success'>Create stock</Link>;
                                </div>
                            </div>


                        </div> : <div>
                            <h3 style={{textAlign: 'center', color: 'white'}}
                                className={'animated fadeInDown'}>Stocks</h3>
                            <div className="container">
                                <StocksList stocks={this.props.stocks} role={localStorage.getItem('role')}/>
                            </div>
                        </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(StocksPage);
import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import { Link } from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {LOAD_STOCKS} from "../../constants/stockActionType";
import StocksList from "../lists/StocksList";
import {ROLE_DISPATCHER} from "../../constants/roles/userRoles";


export class StocksPage extends Component {

    componentDidMount() {
        this.updateStocks();
    }

    updateStocks = () => {
        let item = localStorage.getItem('role');
        let role = item.split('_')[1].toLowerCase();
        console.log(role);
        fetch(`/api/${role}/stocks`, {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
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
            <StocksList stocks={this.props.stocks} role={localStorage.getItem('role')}/>
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
import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import CreateAuto from "./modal/createAuto";
import EditAuto from "./modal/editAuto";
import connect from "react-redux/es/connect/connect";
import {LOAD_AUTOS} from "../../constants/autoActionType";
import UsersList from "../lists/UsersList";
import {ROLE_ADMIN, ROLE_OWNER} from "../../constants/roles/userRoles";
import CreateUser from "../common/adminAndOwner/createUser";
import AutoList from "../lists/AutoList";


export class AdminAutos extends Component {

    constructor(props) {
        super(props);
        document.title = 'Autos';
    }


    componentDidMount() {
        this.getAutos();
    }

    getAutos = () => {
        fetch('/api/admin/autos', {headers: {'authorization': localStorage.getItem('authorization')}}).then(response => {
            return response.json();
        }).then(data => {
            if (data.error === undefined) {
                this.props.loadAutos(data);
            } else {
                NotificationManager.error(data.error);
            }
        }).catch(err => {
            NotificationManager.error(err.toString());
        })
    };

    render() {
        return (

            <div>
                <h3 style={{textAlign: 'center', color: 'white'}} className={'animated fadeInDown'}>Autos</h3>

                <div className={'row margin-container'}>

                    <div className="offset-md-2 col-md-5">
                        <AutoList autos={this.props.autos} role={ROLE_ADMIN}/>
                    </div>
                    <div className="offset-md-2 col-md-2">
                        <CreateAuto renderAutos={this.getAutos}/>
                    </div>
                </div>
            </div>
        );
    }


}


const mapStateToProps = state => {
    return {
        autos: state.autoReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        loadAutos: payload => {
            dispatch({
                type: LOAD_AUTOS, payload: payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAutos);

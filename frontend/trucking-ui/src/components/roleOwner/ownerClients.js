import React, {Component} from 'react';
import {NotificationManager} from "react-notifications";
import CreateClient from "./modal/createClient";
import {LOAD_CLIENTS} from "../../constants/clientActionType";
import connect from "react-redux/es/connect/connect";
import UsersList from "../lists/UsersList";
import CreateUser from "../common/adminAndOwner/createUser";
import ClientsList from "../lists/ClientsList";


export class OwnerClients extends Component {

    constructor(props) {
        super(props);
        document.title = 'Clients';
    }


    componentDidMount(){
        this.getClients();
    }

    getClients = () => {
        fetch('/api/owner/clients',{headers:{'authorization': localStorage.getItem('authorization')}}).then(response=>{
            return response.json();
        }).then(data=>{
            if (data.error===undefined){
                this.props.loadClients(data);
            }else{
                NotificationManager.error(data.error);
            }
        }).catch(err=>{
            NotificationManager.error('Server error');
        });
    };

    render() {
        return (
            <div>
                <h3 style={{textAlign:'center', color: 'white'}} className={'animated fadeInDown'}>Clients</h3>
                <div className={'row margin-container'}>

                    <div className="offset-md-2 col-md-8">
                        <ClientsList clients={this.props.clients}/>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        clients: state.clientReducer
    };
};

const mapDispatchToProps = dispatch => {
    return ({
        loadClients: payload => {
            dispatch({
                type: LOAD_CLIENTS, payload: payload
            })
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerClients);
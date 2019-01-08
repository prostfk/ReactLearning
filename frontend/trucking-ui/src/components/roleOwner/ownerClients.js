import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import CreateClient from "./modal/createClient";
import {LOAD_CLIENTS} from "../../constants/clientActionType";
import connect from "react-redux/es/connect/connect";


export class OwnerClients extends Component {

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
            <div className={'container'}>
                <MDBRow>
                    <MDBCol/>
                    <MDBCol size={'6'}>
                        {this.props.clients.length > 0 ? <Table>
                            <TableHead color="grey">
                                <tr className={'animated fadeIn'}>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Edit</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.clients.map((client, index) => {
                                        return <tr className={'animated fadeInUp'} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{client.name}</td>
                                            <td>{client.type}</td>
                                            {/*<td><EditAuto auto={auto} renderAutos={this.getAutos}/></td>*/}
                                        </tr>
                                    })
                                }
                            </TableBody>
                        </Table> : <h1 className={'animated fadeIn'}>No clients yet</h1>}
                    </MDBCol>
                    <MDBCol>
                        <CreateClient renderClients={this.getClients}/>
                    </MDBCol>
                </MDBRow>
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
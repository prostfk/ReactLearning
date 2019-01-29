import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import CreateAuto from "./modal/createAuto";
import EditAuto from "./modal/editAuto";
import connect from "react-redux/es/connect/connect";
import {LOAD_AUTOS} from "../../constants/autoActionType";


export class AdminAutos extends Component {

    componentDidMount(){
        this.getAutos();
    }

    getAutos = () => {
        fetch('/api/admin/autos',{headers:{'authorization': localStorage.getItem('authorization')}}).then(response=>{
            return response.json();
        }).then(data=>{
            if (data.error===undefined){
                this.props.loadAutos(data);
            }else{
                NotificationManager.error(data.error);
            }
        }).catch(err=>{
            NotificationManager.error(err.toString());
        })
    };

    render() {
        return (
            <div className={'container'}>
                <MDBRow>
                    <MDBCol/>
                    <MDBCol size={'6'}>
                        {this.props.autos.length > 0 ? <Table>
                            <TableHead color="grey">
                                <tr className={'animated fadeIn'}>
                                    <th>id</th>
                                    <th>Name</th>
                                    <th>Auto Num</th>
                                    <th>Type</th>
                                    <th>Fuel</th>
                                    <th>Edit</th>
                                </tr>
                            </TableHead>
                            <TableBody>
                                {
                                    this.props.autos.map((auto, index) => {
                                        return <tr className={'animated fadeInUp'} key={index}>
                                            <td>{index + 1}</td>
                                            <td>{auto.name}</td>
                                            <td>{auto.carNumber}</td>
                                            <td>{auto.type}</td>
                                            <td>{auto.fuelConsumption}</td>
                                            <td><EditAuto auto={auto} renderAutos={this.getAutos}/></td>
                                        </tr>
                                    })
                                }
                            </TableBody>
                        </Table> : <h1 className={'animated fadeIn'}>No autos yet</h1>}
                    </MDBCol>
                    <MDBCol>
                        <CreateAuto renderAutos={this.getAutos}/>
                    </MDBCol>
                </MDBRow>
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

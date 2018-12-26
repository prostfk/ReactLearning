import React, {Component} from 'react';
import {MDBRow, MDBCol, Table, TableBody, TableHead} from 'mdbreact';
import {NotificationManager} from "react-notifications";
import CreateAuto from "./modal/createAuto";
import EditAuto from "./modal/editAuto";


export default class AdminAutos extends Component {


    state = {
        autos: []
    };

    componentDidMount(){
        this.getAutos();
    }

    getAutos = () => {
        fetch('/api/admin/autos',{headers:{'authorization': localStorage.getItem('authorization')}}).then(response=>{
            return response.json();
        }).then(data=>{
            if (data.error===undefined){
                this.setState({
                    autos: data
                });
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
                        {this.state.autos.length > 0 ? <Table>
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
                                    this.state.autos.map((auto, index) => {
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